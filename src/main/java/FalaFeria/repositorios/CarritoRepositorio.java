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
    // Buscar todo lo que tiene un usuario en su carro
    List<CarritoItem> findByUsuario(Usuario usuario);
    
    // Buscar si ya existe un producto específico en el carro de alguien (para sumar cantidad)
    Optional<CarritoItem> findByUsuarioAndProducto(Usuario usuario, Producto producto);
    
    // Vaciar el carro de un usuario (al pagar)
    void deleteByUsuario(Usuario usuario);
}