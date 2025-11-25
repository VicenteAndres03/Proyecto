package FalaFeria.seguridad;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;

@Service
public class ServicioJwt {
    
    private static final String SECRET_KEY = "ClaveSuperSecretaParaFirmaDeTokensFalaFeria2024DuocUC"; 
    
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // MÉTODO PARA GENERAR EL TOKEN
    public String generateToken(String email, String rol) {
        return Jwts.builder()
                .setSubject(email) // El "dueño" del token
                .claim("rol", rol) // Guardamos el rol dentro del token
                .setIssuedAt(new Date(System.currentTimeMillis())) // Fecha de creación
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Expira en 10 horas
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // Firma digital
                .compact();
    }

    // MÉTODO PARA LEER EL USUARIO DEL TOKEN
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    
    // VALIDAR SI EL TOKEN ES CORRECTO
    public boolean validateToken(String token, String email) {
        final String username = extractUsername(token);
        return (username.equals(email) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }

}
