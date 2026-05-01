package com.example.tickets;

import com.example.tickets.ai.MockAiClient;
import com.example.tickets.dto.CreateTicketRequest;
import com.example.tickets.repository.*;
import com.example.tickets.service.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
class TicketServiceTest {
  @Autowired TicketService ticketService;
  @MockBean AiSummaryRepository aiSummaryRepository;
  @Test void createsTicket() {
    var ticket = ticketService.create(new CreateTicketRequest("Login broken", "urgent login failure", "a@b.com", "enterprise"));
    assertThat(ticket.getId()).isNotNull();
    assertThat(ticket.getStatus().name()).isEqualTo("OPEN");
  }
}
