package FalaFeria.controlador;

import FalaFeria.dto.SolicitudCarrito;
import FalaFeria.modelos.CarritoItem;
import FalaFeria.modelos.Producto;
import FalaFeria.modelos.Usuario;
import FalaFeria.repositorios.CarritoRepositorio;
import FalaFeria.repositorios.ProductoRepositorio;
import FalaFeria.repositorios.UsuarioRepositorio;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "*")
public class CarritoControlador {

    @Autowired private CarritoRepositorio carritoRepo;
    @Autowired private UsuarioRepositorio usuarioRepo;
    @Autowired private ProductoRepositorio productoRepo;

    // 1. VER EL CARRITO DE UN USUARIO
    // URL: /api/carrito/usuario/{id}
    @GetMapping("/usuario/{id}")
    public List<CarritoItem> verCarrito(@PathVariable Long id) {
        Usuario usuario = usuarioRepo.findById(id).orElse(null);
        if (usuario == null) return null;
        return carritoRepo.findByUsuario(usuario);
    }

    // 2. AGREGAR PRODUCTO AL CARRITO
    @PostMapping("/agregar")
    public CarritoItem agregarAlCarrito(@RequestBody SolicitudCarrito request) {
        Usuario usuario = usuarioRepo.findById(request.getUsuarioId()).orElseThrow();
        Producto producto = productoRepo.findById(request.getProductoId()).orElseThrow();

        // Ver si ya lo tiene para sumar cantidad
        Optional<CarritoItem> itemExistente = carritoRepo.findByUsuarioAndProducto(usuario, producto);

        if (itemExistente.isPresent()) {
            CarritoItem item = itemExistente.get();
            item.setCantidad(item.getCantidad() + 1);
            return carritoRepo.save(item);
        } else {
            CarritoItem nuevo = new CarritoItem(usuario, producto, 1);
            return carritoRepo.save(nuevo);
        }
    }

    // 3. RESTAR CANTIDAD O ELIMINAR
    @PostMapping("/restar")
    public void restarDelCarrito(@RequestBody SolicitudCarrito request) {
        Usuario usuario = usuarioRepo.findById(request.getUsuarioId()).orElseThrow();
        Producto producto = productoRepo.findById(request.getProductoId()).orElseThrow();
        
        Optional<CarritoItem> itemExistente = carritoRepo.findByUsuarioAndProducto(usuario, producto);
        
        if (itemExistente.isPresent()) {
            CarritoItem item = itemExistente.get();
            if (item.getCantidad() > 1) {
                item.setCantidad(item.getCantidad() - 1);
                carritoRepo.save(item);
            } else {
                carritoRepo.delete(item);
            }
        }
    }

    // 4. ELIMINAR PRODUCTO COMPLETO
    @DeleteMapping("/eliminar/{itemId}")
    public void eliminarItem(@PathVariable Long itemId) {
        carritoRepo.deleteById(itemId);
    }

    // 5. VACIAR CARRITO (Checkout)
    @Transactional // Importante para borrar varios a la vez
    @DeleteMapping("/vaciar/{usuarioId}")
    public void vaciarCarrito(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioRepo.findById(usuarioId).orElseThrow();
        carritoRepo.deleteByUsuario(usuario);
    }
}