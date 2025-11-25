package FalaFeria.modelos;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore; // <--- ¡ESTE IMPORT ES VITAL!

@Entity
@Table(name = "categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    // --- AQUÍ ESTÁ EL CORTE DEL BUCLE ---
    @JsonIgnore // <--- ¡Sin esto, tu página se queda cargando para siempre!
    @OneToMany(mappedBy = "categoria")
    private List<Producto> productos;

    public Categoria() {}

    public Categoria(String nombre) {
        this.nombre = nombre;
    }

    public Long getId(){
        return id; }

    public void setId(Long id){
        this.id = id; }

    public String getNombre(){
        return nombre; }

    public void setNombre(String nombre){
        this.nombre = nombre; }

    public List<Producto> getProductos(){
        return productos; }
        
    public void setProductos(List<Producto> productos){
        this.productos = productos; }
}