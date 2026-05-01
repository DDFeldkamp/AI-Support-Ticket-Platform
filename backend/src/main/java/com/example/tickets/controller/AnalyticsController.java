package com.example.tickets.controller;
import com.example.tickets.dto.AnalyticsResponse;
import com.example.tickets.service.AnalyticsService;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/analytics")
public class AnalyticsController {
  private final AnalyticsService service; public AnalyticsController(AnalyticsService service){this.service=service;}
  @GetMapping("/summary") public AnalyticsResponse summary(){ return service.summary(); }
}
