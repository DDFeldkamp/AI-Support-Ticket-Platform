package com.example.tickets.service;

import com.example.tickets.dto.AnalyticsResponse;
import com.example.tickets.model.*;
import com.example.tickets.repository.TicketRepository;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class AnalyticsService {
  private final TicketRepository repo;
  public AnalyticsService(TicketRepository repo){this.repo=repo;}
  public AnalyticsResponse summary(){
    Map<String, Long> byPriority = new LinkedHashMap<>();
    for (Priority p: Priority.values()) byPriority.put(p.name(), repo.countByPriority(p));
    Map<String, Long> byStatus = new LinkedHashMap<>();
    for (TicketStatus s: TicketStatus.values()) byStatus.put(s.name(), repo.countByStatus(s));
    return new AnalyticsResponse(repo.count(), repo.countBySlaRiskTrue(), byPriority, byStatus);
  }
}
