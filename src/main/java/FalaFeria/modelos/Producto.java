package FalaFeria.modelos;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "productos")
public class Producto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String descripcion;
    private Integer precio;
    private String imagenUrl;


    @ManyToOne
    @JoinColumn(name = "categoria_id") // Crea la columna de enlace (FK)
    private Categoria categoria;

    // --- RELACIÓN CON MARCA (ManyToOne) ---
    @ManyToOne
    @JoinColumn(name = "marca_id") // Crea la columna de enlace (FK)
    private Marca marca;

    public Producto(){

    }

    public Producto(String nombre, String descripcion, Integer precio, String imagenUrl, Categoria categoria, Marca marca){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagenUrl = imagenUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id){
        this.id = id; 
    }

    public String getNombre(){
        return nombre;
    }

    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public String getDescripcion(){
        return descripcion;
    }

    public void setDescripcion(String descripcion){
        this.descripcion = descripcion;
    }

    public Integer getPrecio() {
        return precio;
    }

    public void setPrecio(Integer precio) {
        this.precio = precio;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public Categoria getCategoria(){
        return categoria; }

    public void setCategoria(Categoria categoria){
        this.categoria = categoria; }
    
    public Marca getMarca(){
        return marca; }

    public void setMarca(Marca marca){
        this.marca = marca; }

}
