package FalaFeria.controlador;

import FalaFeria.dto.SolicitudLogin;
import FalaFeria.dto.PeticionLogin;
import FalaFeria.modelos.Usuario; // Importante
import FalaFeria.repositorios.UsuarioRepositorio;
import FalaFeria.seguridad.ServicioJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
// Sin @CrossOrigin aquí (ya está en la config global)
public class AuthControlador {

    @Autowired
    private UsuarioRepositorio usuarioRepo;

    @Autowired
    private ServicioJwt jwtService;

    // --- LOGIN (Ya lo tenías) ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody SolicitudLogin request) {
        System.out.println("👀 LOGIN: " + request.getEmail());
        
        Optional<Usuario> usuarioOpt = usuarioRepo.findByEmail(request.getEmail());
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (usuario.getPassword().equals(request.getPassword())) {
                String token = jwtService.generateToken(usuario.getEmail(), usuario.getRol());
                return ResponseEntity.ok(new PeticionLogin(token, usuario.getRol(), usuario.getId()));
            }
        }
        return ResponseEntity.status(401).body("Credenciales incorrectas");
    }

    // --- NUEVO: REGISTRO ---
    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody Usuario nuevoUsuario) {
        // 1. Verificar si el email ya existe
        if (usuarioRepo.findByEmail(nuevoUsuario.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: El email ya está registrado.");
        }

        // 2. Asignar rol por defecto si no viene
        if (nuevoUsuario.getRol() == null || nuevoUsuario.getRol().isEmpty()) {
            nuevoUsuario.setRol("USER"); // Por seguridad, todos nacen como usuarios normales
        }

        // 3. Guardar en BD
        usuarioRepo.save(nuevoUsuario);
        
        return ResponseEntity.ok("¡Usuario registrado exitosamente!");
    }
}