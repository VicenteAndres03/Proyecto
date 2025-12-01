package FalaFeria.repositorios;

import FalaFeria.modelos.CarritoItem;
import FalaFeria.modelos.Usuario;
import FalaFeria.modelos.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CarritoRepositorio extends JpaRepository<CarritoItem, Long> {

    List<CarritoItem> findByUsuario(Usuario usuario);
    
    Optional<CarritoItem> findByUsuarioAndProducto(Usuario usuario, Producto producto);
    
    void deleteByUsuario(Usuario usuario);
}