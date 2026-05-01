package com.example.tickets.controller;

import com.example.tickets.dto.*;
import com.example.tickets.model.*;
import com.example.tickets.repository.AiSummaryRepository;
import com.example.tickets.service.*;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController @RequestMapping("/api/tickets")
public class TicketController {
  private final TicketService tickets; private final AiProcessingService ai; private final AiSummaryRepository summaries;
  public TicketController(TicketService tickets, AiProcessingService ai, AiSummaryRepository summaries){this.tickets=tickets;this.ai=ai;this.summaries=summaries;}
  @PostMapping public Ticket create(@Valid @RequestBody CreateTicketRequest req){ return tickets.create(req); }
  @GetMapping public Page<Ticket> search(@RequestParam(required=false) String q, @RequestParam(required=false) TicketStatus status, @RequestParam(required=false) Priority priority, @RequestParam(defaultValue="0") int page, @RequestParam(defaultValue="20") int size){ return tickets.search(q,status,priority,page,size); }
  @GetMapping("/{id}") public Map<String,Object> get(@PathVariable Long id){ return Map.of("ticket", tickets.get(id), "aiSummary", summaries.findTopByTicketIdOrderByCreatedAtDesc(id).orElse(null)); }
  @PatchMapping("/{id}/status") public Ticket status(@PathVariable Long id, @RequestBody UpdateStatusRequest req){ return tickets.updateStatus(id, req.status()); }
  @PostMapping("/{id}/summarize") public AiResult summarize(@PathVariable Long id){ return ai.processTicket(id); }
}
