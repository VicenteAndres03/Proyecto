package FalaFeria.controlador;

import FalaFeria.dto.SolicitudLogin;
import FalaFeria.dto.PeticionLogin;
import FalaFeria.modelos.Usuario; 
import FalaFeria.repositorios.UsuarioRepositorio;
import FalaFeria.seguridad.ServicioJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")

public class AuthControlador {

    @Autowired
    private UsuarioRepositorio usuarioRepo;

    @Autowired
    private ServicioJwt jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody SolicitudLogin request) {
        System.out.println("LOGIN: " + request.getEmail());
        
        Optional<Usuario> usuarioOpt = usuarioRepo.findByEmail(request.getEmail());
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (usuario.getPassword().equals(request.getPassword())) {
                String token = jwtService.generarToken(usuario.getEmail(), usuario.getRol());
                return ResponseEntity.ok(new PeticionLogin(token, usuario.getRol(), usuario.getId(), usuario.getNombre()));
            }
            if (passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
                
                String token = jwtService.generarToken(usuario.getEmail(), usuario.getRol());
                return ResponseEntity.ok(new PeticionLogin(token, usuario.getRol(), usuario.getId(), usuario.getNombre()));
            }
        }
        return ResponseEntity.status(401).body("Credenciales incorrectas");
    }

    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody Usuario nuevoUsuario) {

        if (usuarioRepo.findByEmail(nuevoUsuario.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: El email ya está registrado.");
        }

        String passEncriptada = passwordEncoder.encode(nuevoUsuario.getPassword());
        nuevoUsuario.setPassword(passEncriptada);
        
        if (nuevoUsuario.getRol() == null || nuevoUsuario.getRol().isEmpty()) {
            nuevoUsuario.setRol("USER"); 
        }

        usuarioRepo.save(nuevoUsuario);
        
        return ResponseEntity.ok("¡Usuario registrado exitosamente!");
    }
}