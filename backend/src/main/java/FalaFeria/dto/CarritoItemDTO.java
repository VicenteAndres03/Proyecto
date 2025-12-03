package FalaFeria.dto;

public class CarritoItemDTO {
    private Long id;
    private int cantidad;
    private String nombreProducto;
    private Integer precioProducto;
    private String imagenUrl;
    private Long productoId;

    public CarritoItemDTO(Long id, int cantidad, String nombreProducto, Integer precioProducto, String imagenUrl, Long productoId) {
        this.id = id;
        this.cantidad = cantidad;
        this.nombreProducto = nombreProducto;
        this.precioProducto = precioProducto;
        this.imagenUrl = imagenUrl;
        this.productoId = productoId;
    }

    public Long getId(){
        return id; }

    public void setId(Long id){
        this.id = id; }

    public int getCantidad(){
        return cantidad; }

    public void setCantidad(int cantidad){
        this.cantidad = cantidad; }

    public String getNombreProducto(){
        return nombreProducto; }

    public void setNombreProducto(String nombreProducto)
    { this.nombreProducto = nombreProducto; }

    public Integer getPrecioProducto(){
        return precioProducto; }

    public void setPrecioProducto(Integer precioProducto){
        this.precioProducto = precioProducto; }

    public String getImagenUrl(){
        return imagenUrl; }

    public void setImagenUrl(String imagenUrl){
        this.imagenUrl = imagenUrl; }

    public Long getProductoId(){
        return productoId; }

    public void setProductoId(Long productoId){
        this.productoId = productoId; }
}