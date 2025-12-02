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
    private ServicioJwt servicioJwt; 

    @Autowired
    private UsuarioRepositorio usuarioRepositorio; 

    @Override
    protected void doFilterInternal(HttpServletRequest peticion, 
                                    HttpServletResponse respuesta, 
                                    FilterChain cadenaFiltros)
            throws ServletException, IOException {

      
        final String encabezadoAuth = peticion.getHeader("Authorization");
        final String token;
        final String emailUsuario;

      
        if (encabezadoAuth == null || !encabezadoAuth.startsWith("Bearer ")) {
            cadenaFiltros.doFilter(peticion, respuesta); 
            return;
        }

      
        token = encabezadoAuth.substring(7);
        emailUsuario = servicioJwt.extraerUsuario(token);


        if (emailUsuario != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            

            Optional<Usuario> usuarioOpt = usuarioRepositorio.findByEmail(emailUsuario);

            if (usuarioOpt.isPresent()) {
                Usuario usuarioEncontrado = usuarioOpt.get();

  
                if (servicioJwt.validarToken(token, usuarioEncontrado.getEmail())) {
                    
          
                    SimpleGrantedAuthority permiso = new SimpleGrantedAuthority("ROLE_" + usuarioEncontrado.getRol());

                    UsernamePasswordAuthenticationToken autenticacion = new UsernamePasswordAuthenticationToken(
                            usuarioEncontrado,
                            null,
                            Collections.singletonList(permiso)
                    );

                    autenticacion.setDetails(new WebAuthenticationDetailsSource().buildDetails(peticion));

                    SecurityContextHolder.getContext().setAuthentication(autenticacion);
                }
            }
        }

        cadenaFiltros.doFilter(peticion, respuesta);
    }
}