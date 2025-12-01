package FalaFeria.controlador;

import FalaFeria.modelos.Marca;
import FalaFeria.repositorios.MarcaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/marcas")
public class MarcaControlador {

    @Autowired
    private MarcaRepositorio repositorio;

    @GetMapping
    public List<Marca> obtenerTodas() {
        return repositorio.findAll();
    }

    @PostMapping
    public Marca crearMarca(@RequestBody Marca nuevaMarca) {
        return repositorio.save(nuevaMarca);
    }

    @PutMapping("/{id}")
    public Marca actualizarMarca(@PathVariable Long id, @RequestBody Marca detalles) {
        Optional<Marca> marcaOpt = repositorio.findById(id);
        
        if (marcaOpt.isPresent()) {
            Marca marca = marcaOpt.get();
            marca.setNombre(detalles.getNombre());
            return repositorio.save(marca);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void eliminarMarca(@PathVariable Long id) {
        repositorio.deleteById(id);
    }
}