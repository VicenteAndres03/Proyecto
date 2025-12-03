package FalaFeria.modelos;

import java.time.LocalDate;

import jakarta.persistence.*;

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
    private LocalDate fechaIngreso;
    private boolean envioGratis;
    private String condicion;

    @PrePersist
    public void antesDeGuardar() {
        if (this.fechaIngreso == null) {
            this.fechaIngreso = LocalDate.now();
        }
    }

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

  
    @ManyToOne
    @JoinColumn(name = "marca_id") 
    private Marca marca;

    public Producto(){

    }

    public Producto(String nombre, String descripcion, Integer precio, String imagenUrl, Categoria categoria, Marca marca,
                    boolean envioGratis, String condicion) {

        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagenUrl = imagenUrl;
        this.categoria = categoria;
        this.marca = marca;
        this.envioGratis = envioGratis;
        this.condicion = condicion;
        this.fechaIngreso = LocalDate.now();
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
    
    public LocalDate getFechaIngreso(){
        return fechaIngreso; }

    public void setFechaIngreso(LocalDate fechaIngreso){
        this.fechaIngreso = fechaIngreso; }
    
    public boolean isEnvioGratis(){
        return envioGratis; }

    public void setEnvioGratis(boolean envioGratis){
        this.envioGratis = envioGratis; }

    public String getCondicion(){
        return condicion; }

    public void setCondicion(String condicion){
        this.condicion = condicion; }
}
