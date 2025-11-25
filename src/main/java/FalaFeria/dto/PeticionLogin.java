package FalaFeria.dto;

public class PeticionLogin {
    private String token;
    private String rol;
    private Long id;

    public PeticionLogin(String token, String rol, Long id) {
        this.token = token;
        this.rol = rol;
        this.id = id;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
}