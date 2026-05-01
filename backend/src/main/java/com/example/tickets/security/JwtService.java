package com.example.tickets.security;

import com.example.tickets.model.UserRole;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {
  private final SecretKey key;
  public JwtService(@Value("${app.jwt-secret}") String secret) {
    this.key = Keys.hmacShaKeyFor(secret.repeat(3).substring(0, 48).getBytes(StandardCharsets.UTF_8));
  }
  public String createDemoToken(UserRole role) {
    return Jwts.builder().subject("demo@example.com").claim("role", role.name())
      .issuedAt(new Date()).expiration(new Date(System.currentTimeMillis()+86_400_000))
      .signWith(key).compact();
  }
  public String roleFromToken(String token) {
    return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().get("role", String.class);
  }
}
