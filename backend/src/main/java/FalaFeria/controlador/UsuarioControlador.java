package FalaFeria.controlador;

import FalaFeria.modelos.Usuario;
import FalaFeria.repositorios.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioControlador {

    @Autowired
    private UsuarioRepositorio usuarioRepo;

    // GET /api/usuarios
    // Lista todos los usuarios (para la tabla de Gestión de Clientes)
    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioRepo.findAll();
    }

    // GET /api/usuarios/{id}
    // (opcional, por si quieres ver un usuario específico)
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id) {
        return usuarioRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/usuarios/{id}
    // Elimina un usuario (para el botón "Eliminar" en Gestión de Clientes)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!usuarioRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        usuarioRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
