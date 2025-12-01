package FalaFeria.controlador;

import FalaFeria.modelos.Categoria;
import FalaFeria.repositorios.CategoriaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaControlador {

    @Autowired
    private CategoriaRepositorio repositorio;

    @GetMapping
    public List<Categoria> obtenerTodas() {
        return repositorio.findAll();
    }

    @PostMapping
    public Categoria crearCategoria(@RequestBody Categoria nuevaCategoria) {
        return repositorio.save(nuevaCategoria);
    }

    @PutMapping("/{id}")
    public Categoria actualizarCategoria(@PathVariable Long id, @RequestBody Categoria detalles) {
        Optional<Categoria> categoriaOpt = repositorio.findById(id);
        
        if (categoriaOpt.isPresent()) {
            Categoria categoria = categoriaOpt.get();
            categoria.setNombre(detalles.getNombre());
            return repositorio.save(categoria);
        }
        return null; 
    }

    @DeleteMapping("/{id}")
    public void eliminarCategoria(@PathVariable Long id) {
        repositorio.deleteById(id);
    }
}