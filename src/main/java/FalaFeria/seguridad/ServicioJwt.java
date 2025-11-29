package FalaFeria.seguridad;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;

@Service
public class ServicioJwt {

    @Value("${jwt.secret}")
    private String claveSecreta; // También traduje el nombre de la variable para que combine

    @Value("${jwt.expiration}")
    private long expiracionJwt;

    // Antes: getSigningKey
    private Key obtenerClaveFirma() {
        return Keys.hmacShaKeyFor(claveSecreta.getBytes());
    }

    // Antes: generateToken
    public String generarToken(String email, String rol) {
        return Jwts.builder()
                .setSubject(email)
                .claim("rol", rol)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiracionJwt)) 
                .signWith(obtenerClaveFirma(), SignatureAlgorithm.HS256) // Llamada actualizada
                .compact();
    }

    // Antes: extractUsername
    public String extraerUsuario(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(obtenerClaveFirma()) // Llamada actualizada
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    
    // Antes: validateToken
    public boolean validarToken(String token, String email) {
        final String usuario = extraerUsuario(token); // Llamada actualizada
        return (usuario.equals(email) && !esTokenExpirado(token)); // Llamada actualizada
    }

    // Antes: isTokenExpired
    private boolean esTokenExpirado(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(obtenerClaveFirma()) // Llamada actualizada
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }
}