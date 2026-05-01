package com.example.tickets.service;

import com.example.tickets.dto.*;
import com.example.tickets.model.*;
import com.example.tickets.repository.TicketRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TicketService {
  private final TicketRepository ticketRepository;
  private final AiProcessingService aiProcessingService;
  public TicketService(TicketRepository ticketRepository, AiProcessingService aiProcessingService) {
    this.ticketRepository=ticketRepository; this.aiProcessingService=aiProcessingService;
  }
  @Transactional
  public Ticket create(CreateTicketRequest request) {
    Ticket ticket = new Ticket();
    ticket.setTitle(request.title());
    ticket.setDescription(request.description());
    ticket.setCustomerEmail(request.customerEmail());
    if (request.customerTier()!=null) ticket.setCustomerTier(request.customerTier());
    Ticket saved = ticketRepository.save(ticket);
    aiProcessingService.processTicketAsync(saved.getId());
    return saved;
  }
  public Page<Ticket> search(String q, TicketStatus status, Priority priority, int page, int size) {
    return ticketRepository.search(q, status, priority, PageRequest.of(page, Math.min(size, 100), Sort.by(Sort.Direction.DESC, "createdAt")));
  }
  public Ticket get(Long id) { return ticketRepository.findById(id).orElseThrow(); }
  @Transactional
  public Ticket updateStatus(Long id, TicketStatus status) {
    Ticket ticket = get(id); ticket.setStatus(status); return ticketRepository.save(ticket);
  }
}
