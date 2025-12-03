package FalaFeria.repositorios;
import FalaFeria.modelos.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepositorio extends JpaRepository<Categoria, Long> {
    Categoria findByNombre(String nombre); // Para buscar por nombre
}