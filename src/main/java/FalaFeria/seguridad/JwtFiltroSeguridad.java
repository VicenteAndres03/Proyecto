package FalaFeria.seguridad;

import FalaFeria.modelos.Usuario;
import FalaFeria.repositorios.UsuarioRepositorio;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Component
public class JwtFiltroSeguridad extends OncePerRequestFilter {

    @Autowired
    private ServicioJwt servicioJwt; // Tu herramienta de tokens

    @Autowired
    private UsuarioRepositorio usuarioRepositorio; // Tu conexión a la BD

    @Override
    protected void doFilterInternal(HttpServletRequest peticion, 
                                    HttpServletResponse respuesta, 
                                    FilterChain cadenaFiltros)
            throws ServletException, IOException {

        // 1. OBTENER CABECERA
        final String encabezadoAuth = peticion.getHeader("Authorization");
        final String token;
        final String emailUsuario;

        // 2. VALIDAR FORMATO
        if (encabezadoAuth == null || !encabezadoAuth.startsWith("Bearer ")) {
            cadenaFiltros.doFilter(peticion, respuesta); // Deja pasar (sin loguear)
            return;
        }

        // 3. EXTRAER DATOS
        token = encabezadoAuth.substring(7);
        emailUsuario = servicioJwt.extraerUsuario(token);

        // 4. VERIFICAR SI NO ESTÁ LOGUEADO AÚN
        if (emailUsuario != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            // Buscar en BD
            Optional<Usuario> usuarioOpt = usuarioRepositorio.findByEmail(emailUsuario);

            if (usuarioOpt.isPresent()) {
                Usuario usuarioEncontrado = usuarioOpt.get();

                // 5. VALIDAR FIRMA
                if (servicioJwt.validarToken(token, usuarioEncontrado.getEmail())) {
                    
                    // 6. PREPARAR CARNET DE ACCESO (Spring Security)
                    SimpleGrantedAuthority permiso = new SimpleGrantedAuthority("ROLE_" + usuarioEncontrado.getRol());

                    UsernamePasswordAuthenticationToken autenticacion = new UsernamePasswordAuthenticationToken(
                            usuarioEncontrado,
                            null,
                            Collections.singletonList(permiso)
                    );

                    autenticacion.setDetails(new WebAuthenticationDetailsSource().buildDetails(peticion));

                    // 7. AUTORIZAR FINALMENTE
                    SecurityContextHolder.getContext().setAuthentication(autenticacion);
                }
            }
        }
        
        // 8. CONTINUAR
        cadenaFiltros.doFilter(peticion, respuesta);
    }
}