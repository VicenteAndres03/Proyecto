package FalaFeria;

import FalaFeria.modelos.Categoria;
import FalaFeria.modelos.Marca;
import FalaFeria.modelos.Producto;
import FalaFeria.repositorios.CategoriaRepositorio;
import FalaFeria.repositorios.MarcaRepositorio;
import FalaFeria.repositorios.ProductoRepositorio;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FalaFeriaApplication {

    public static void main(String[] args) {
        SpringApplication.run(FalaFeriaApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData(ProductoRepositorio prodRepo, 
                                      CategoriaRepositorio catRepo, 
                                      MarcaRepositorio marcaRepo) {
        return (args) -> {
            // Solo cargamos datos si no hay categorías creadas
            if (catRepo.count() == 0) {
                
                // 1. CREAR LAS CATEGORÍAS (Tabla CATEGORIAS)
                Categoria catHombre = new Categoria("hombre");
                Categoria catMujer = new Categoria("mujer");
                catRepo.save(catHombre);
                catRepo.save(catMujer);

                // 2. CREAR LA MARCA (Tabla MARCAS)
                Marca marcaFala = new Marca("FalaFeria");
                marcaRepo.save(marcaFala);

                // 3. CREAR LOS PRODUCTOS (Tabla PRODUCTOS)
                // Fíjate que ahora pasamos los OBJETOS 'catHombre' y 'marcaFala', no texto.
                
                // --- HOMBRE ---
                Producto p1 = new Producto("Poleron Hombre", "Talla XL, Color Negro", 5700, "/Ropa/Poleron Hombre/Poleron1h.webp", catHombre, marcaFala);
                Producto p3 = new Producto("Polera Hombre", "Talla XL, Diseño Urbano", 3800, "/Ropa/Polera Hombre/Polera1H.webp", catHombre, marcaFala);
                Producto p5 = new Producto("Pantalon Hombre", "Jeans Talla 42", 4300, "/Ropa/Pantalon Hombre/Pantalon1H.webp", catHombre, marcaFala);

                // --- MUJER ---
                Producto p2 = new Producto("Poleron Mujer", "Talla M, Color Gris", 5300, "/Ropa/Poleron Mujer/Poleron1M.webp", catMujer, marcaFala);
                Producto p4 = new Producto("Polera Mujer", "Talla M, Algodón", 3800, "/Ropa/Polera Mujer/Polera1M.webp", catMujer, marcaFala);
                Producto p6 = new Producto("Pantalon Mujer", "Jeans Talla 38", 4300, "/Ropa/Pantalon Mujer/Pantalon1M.webp", catMujer, marcaFala);

                // Guardamos productos
                prodRepo.save(p1);
                prodRepo.save(p2);
                prodRepo.save(p3);
                prodRepo.save(p4);
                prodRepo.save(p5);
                prodRepo.save(p6);
                
                System.out.println("✅ ¡Base de Datos Relacional (3 Tablas) cargada exitosamente!");
            }
        };
    }
}