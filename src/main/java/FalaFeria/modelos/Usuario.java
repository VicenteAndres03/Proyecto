package FalaFeria.modelos;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String rut;
    
    @Column(unique = true) 
    private String email;
    
    private String password;
    private String rol;      

    public Usuario() {}

    public Usuario(String nombre, String rut, String email, String password, String rol) {
        this.nombre = nombre;
        this.rut = rut;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }

    public Long getId(){
        return id; }

    public void setId(Long id){
        this.id = id; }
    
    public String getNombre(){
        return nombre; }

    public void setNombre(String nombre){
        this.nombre = nombre; }

    public String getRut(){
        return rut; }

    public void setRut(String rut){
        this.rut = rut; }

    public String getEmail(){
        return email; }
        
    public void setEmail(String email){
        this.email = email; }
    
    public String getPassword(){
        return password; }

    public void setPassword(String password){
        this.password = password; }
    
    public String getRol(){
        return rol; }

    public void setRol(String rol){
        this.rol = rol; }
        
}