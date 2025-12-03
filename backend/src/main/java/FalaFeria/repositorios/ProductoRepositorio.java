package FalaFeria.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import FalaFeria.modelos.Producto;
import java.util.List;


@Repository
public interface ProductoRepositorio extends JpaRepository<Producto, Long>{
    
    List<Producto> findByCategoriaNombre(String nombre);
}
