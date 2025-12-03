package FalaFeria.controlador;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import FalaFeria.modelos.Producto;
import FalaFeria.repositorios.ProductoRepositorio;

@RestController
@RequestMapping("/api")
public class ProductoControlador {
    
    @Autowired
    private ProductoRepositorio repositorio;

    @GetMapping("/productos")
    public List<Producto> obtenerTodos(){
        return repositorio.findAll();
    }

    @GetMapping("/productos/filtro/{categoria}")
    public List<Producto> buscaPorCategoria(@PathVariable("categoria") String nombreCategoria){
        return repositorio.findByCategoriaNombre(nombreCategoria);
    }

    @PostMapping("/productos")
    public Producto crearProducto(@RequestBody Producto nuevoProducto) {
        return repositorio.save(nuevoProducto);
    }

    @PutMapping("/productos/{id}")
    public Producto actualizarProducto(@PathVariable Long id, @RequestBody Producto detalles) {
        Producto producto = repositorio.findById(id).orElse(null);
        
        if (producto != null) {

            producto.setNombre(detalles.getNombre());
            producto.setDescripcion(detalles.getDescripcion());
            producto.setPrecio(detalles.getPrecio());
            producto.setImagenUrl(detalles.getImagenUrl());
            producto.setCategoria(detalles.getCategoria());
            producto.setMarca(detalles.getMarca());
            producto.setEnvioGratis(detalles.isEnvioGratis());
            producto.setCondicion(detalles.getCondicion());
            
            return repositorio.save(producto);
        }
        return null;
    }

    @DeleteMapping("/productos/{id}")
    public void eliminarProducto(@PathVariable Long id) {
        repositorio.deleteById(id);
    }
}