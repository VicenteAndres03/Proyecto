package FalaFeria;

import FalaFeria.modelos.Categoria;
import FalaFeria.modelos.Marca;
import FalaFeria.modelos.Producto;
import FalaFeria.modelos.Usuario;
import FalaFeria.repositorios.CategoriaRepositorio;
import FalaFeria.repositorios.MarcaRepositorio;
import FalaFeria.repositorios.ProductoRepositorio;
import FalaFeria.repositorios.UsuarioRepositorio;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class FalaFeriaApplication {

    public static void main(String[] args) {
        SpringApplication.run(FalaFeriaApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData(ProductoRepositorio prodRepo, 
                                      CategoriaRepositorio catRepo, 
                                      MarcaRepositorio marcaRepo,
									  UsuarioRepositorio userRepo,
                                      PasswordEncoder passwordEncoder) {
        return (args) -> {

            if (catRepo.count() == 0) {
                
                Categoria catHombre = new Categoria("hombre");
                Categoria catMujer = new Categoria("mujer");
                catRepo.save(catHombre);
                catRepo.save(catMujer);

                Marca marcaFala = new Marca("FalaFeria");
                marcaRepo.save(marcaFala);

                
                Producto p1 = new Producto("Poleron Hombre", "Talla XL, Color Negro", 5700, "/Ropa/Poleron Hombre/Poleron1h.webp", catHombre, marcaFala, true, "Nuevo");
                Producto p3 = new Producto("Polera Hombre", "Talla XL, Diseño Urbano", 3800, "/Ropa/Polera Hombre/Polera1H.webp", catHombre, marcaFala, false, "Nuevo");
                Producto p5 = new Producto("Pantalon Hombre", "Jeans Talla 42", 4300, "/Ropa/Pantalon Hombre/Pantalon1H.webp", catHombre, marcaFala, true, "Usado");

                Producto p2 = new Producto("Poleron Mujer", "Talla M, Color Gris", 5300, "/Ropa/Poleron Mujer/Poleron1M.webp", catMujer, marcaFala, true, "Nuevo");
                Producto p4 = new Producto("Polera Mujer", "Talla M, Algodón", 3800, "/Ropa/Polera Mujer/Polera1M.webp", catMujer, marcaFala, false, "Nuevo");
                Producto p6 = new Producto("Pantalon Mujer", "Jeans Talla 38", 4300, "/Ropa/Pantalon Mujer/Pantalon1M.webp", catMujer, marcaFala, false, "Usado");
                
				prodRepo.save(p1);
                prodRepo.save(p2);
                prodRepo.save(p3);
                prodRepo.save(p4);
                prodRepo.save(p5);
                prodRepo.save(p6);
                
                System.out.println("Base de Datos Relacional cargada exitosamente!");
            }

			if (userRepo.count() == 0) {

                String passAdmin = passwordEncoder.encode("adminFalaferia123");
                String passCliente = passwordEncoder.encode("1234");

                Usuario admin = new Usuario("Administrador", "11.111.111-1", "admin@falaferia.cl", passAdmin, "ADMIN");    
                Usuario cliente = new Usuario("ClienteFalaferia", "22.222.222-2", "cliente@gmail.com", passCliente, "USER");

                userRepo.save(admin);
                userRepo.save(cliente);
                
                System.out.println("¡Usuarios (Admin y Cliente) creados exitosamente!");
            }
			
        };
    }
}