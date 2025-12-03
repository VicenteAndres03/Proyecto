package FalaFeria.modelos;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "marcas")
public class Marca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre; 

    @JsonIgnore
    @OneToMany(mappedBy = "marca")
    private List<Producto> productos;

    public Marca() {}

    public Marca(String nombre) {
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
