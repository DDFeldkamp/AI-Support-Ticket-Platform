package com.example.tickets.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document("ai_summaries")
public class AiSummary {
  @Id private String id;
  private Long ticketId;
  private String summary;
  private String recommendedTeam;
  private String nextBestAction;
  private Instant createdAt = Instant.now();
  public AiSummary() {}
  public AiSummary(Long ticketId, String summary, String recommendedTeam, String nextBestAction) {
    this.ticketId=ticketId; this.summary=summary; this.recommendedTeam=recommendedTeam; this.nextBestAction=nextBestAction;
  }
  public String getId(){return id;} public Long getTicketId(){return ticketId;} public String getSummary(){return summary;}
  public String getRecommendedTeam(){return recommendedTeam;} public String getNextBestAction(){return nextBestAction;} public Instant getCreatedAt(){return createdAt;}
}
