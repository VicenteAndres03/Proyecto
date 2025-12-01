package FalaFeria.dto;

public class PeticionLogin {
    private String token;
    private String rol;
    private Long usuarioId;
    private String nombre; 

    public PeticionLogin(String token, String rol, Long usuarioId, String nombre) {
        this.token = token;
        this.rol = rol;
        this.usuarioId = usuarioId;
        this.nombre = nombre;
    }

    public String getNombre(){
        return nombre; }

    public void setNombre(String nombre){
        this.nombre = nombre; }

    public String getToken(){
        return token; }

    public void setToken(String token){
        this.token = token; }

    public String getRol(){
        return rol; }

    public void setRol(String rol){
        this.rol = rol; }

    public Long getUsuarioId(){
        return usuarioId; }

    public void setUsuarioId(Long usuarioId){
        this.usuarioId = usuarioId; }
}