package FalaFeria.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public List<Producto> buscaPorCategoria(@PathVariable String nombreCategoria){
        return repositorio.findByCategoriaNombre(nombreCategoria);
    }
}
