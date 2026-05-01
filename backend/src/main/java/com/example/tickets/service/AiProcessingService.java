package com.example.tickets.service;

import com.example.tickets.ai.AiClient;
import com.example.tickets.dto.AiResult;
import com.example.tickets.model.*;
import com.example.tickets.repository.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AiProcessingService {
  private final TicketRepository ticketRepository;
  private final AiSummaryRepository aiSummaryRepository;
  private final AiClient aiClient;
  public AiProcessingService(TicketRepository ticketRepository, AiSummaryRepository aiSummaryRepository, AiClient aiClient) {
    this.ticketRepository=ticketRepository; this.aiSummaryRepository=aiSummaryRepository; this.aiClient=aiClient;
  }
  @Async
  @Transactional
  public void processTicketAsync(Long ticketId) { processTicket(ticketId); }
  @Transactional
  public AiResult processTicket(Long ticketId) {
    Ticket ticket = ticketRepository.findById(ticketId).orElseThrow();
    AiResult result = aiClient.analyze(ticket);
    ticket.setCategory(result.category());
    ticket.setPriority(result.priority());
    ticket.setAssignee(result.recommendedTeam());
    ticket.setSlaRisk(result.slaRisk());
    ticketRepository.save(ticket);
    aiSummaryRepository.save(new AiSummary(ticketId, result.summary(), result.recommendedTeam(), result.nextBestAction()));
    return result;
  }
}
