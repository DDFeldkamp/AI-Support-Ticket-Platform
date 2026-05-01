package com.example.tickets.ai;

import com.example.tickets.dto.AiResult;
import com.example.tickets.model.*;
import org.springframework.stereotype.Component;

@Component
public class MockAiClient implements AiClient {
  public AiResult analyze(Ticket ticket) {
    String text = (ticket.getTitle() + " " + ticket.getDescription()).toLowerCase();
    String category = text.contains("login") || text.contains("password") ? "Authentication" : text.contains("billing") ? "Billing" : "General Support";
    Priority priority = text.contains("down") || text.contains("blocked") || text.contains("urgent") ? Priority.HIGH : Priority.MEDIUM;
    String team = switch (category) { case "Authentication" -> "Identity Platform"; case "Billing" -> "Payments"; default -> "Support Engineering"; };
    boolean slaRisk = priority == Priority.HIGH || "enterprise".equalsIgnoreCase(ticket.getCustomerTier());
    return new AiResult(
      "Customer reports: " + ticket.getTitle() + ". Main issue appears related to " + category + ".",
      category,
      priority,
      team,
      "Review logs, reproduce the issue, and update the customer with next steps.",
      slaRisk
    );
  }
}
