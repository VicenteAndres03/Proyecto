package FalaFeria.modelos;

import jakarta.persistence.*;

@Entity
@Table(name = "carrito_items")
public class CarritoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    private int cantidad;

    public CarritoItem() {}

    public CarritoItem(Usuario usuario, Producto producto, int cantidad) {
        this.usuario = usuario;
        this.producto = producto;
        this.cantidad = cantidad;
    }

    public Long getId(){
        return id; }

    public void setId(Long id){
        this.id = id; }
    
    public Usuario getUsuario(){
        return usuario; } 

    public void setUsuario(Usuario usuario){
        this.usuario = usuario; }
    
    public Producto getProducto(){
        return producto; }

    public void setProducto(Producto producto){
        this.producto = producto; }
    
    public int getCantidad(){
        return cantidad; }

    public void setCantidad(int cantidad){
        this.cantidad = cantidad; }
}