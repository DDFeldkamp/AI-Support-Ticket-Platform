package com.example.tickets.controller;
import com.example.tickets.model.UserRole;
import com.example.tickets.security.JwtService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController @RequestMapping("/api/auth")
public class AuthController {
  private final JwtService jwt; public AuthController(JwtService jwt){this.jwt=jwt;}
  @GetMapping("/demo-token") Map<String,String> token(@RequestParam(defaultValue="ADMIN") UserRole role){ return Map.of("token", jwt.createDemoToken(role)); }
}
