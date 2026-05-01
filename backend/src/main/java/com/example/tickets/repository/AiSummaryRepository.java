package com.example.tickets.repository;
import com.example.tickets.model.AiSummary;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
public interface AiSummaryRepository extends MongoRepository<AiSummary, String> {
  Optional<AiSummary> findTopByTicketIdOrderByCreatedAtDesc(Long ticketId);
}
