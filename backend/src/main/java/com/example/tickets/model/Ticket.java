package com.example.tickets.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.Instant;

@Entity
@Table(name="tickets", indexes={
  @Index(name="idx_ticket_status", columnList="status"),
  @Index(name="idx_ticket_priority", columnList="priority"),
  @Index(name="idx_ticket_created_at", columnList="createdAt"),
  @Index(name="idx_ticket_assignee", columnList="assignee")
})
public class Ticket {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @NotBlank private String title;
  @Column(length=5000) private String description;
  @Enumerated(EnumType.STRING) private TicketStatus status = TicketStatus.OPEN;
  @Enumerated(EnumType.STRING) private Priority priority = Priority.MEDIUM;
  private String category = "Unclassified";
  private String assignee;
  private String customerEmail;
  private String customerTier = "standard";
  private boolean slaRisk;
  private Instant createdAt = Instant.now();
  private Instant updatedAt = Instant.now();

  @PreUpdate void touch(){ updatedAt = Instant.now(); }
  public Long getId(){return id;} public void setId(Long id){this.id=id;}
  public String getTitle(){return title;} public void setTitle(String title){this.title=title;}
  public String getDescription(){return description;} public void setDescription(String description){this.description=description;}
  public TicketStatus getStatus(){return status;} public void setStatus(TicketStatus status){this.status=status;}
  public Priority getPriority(){return priority;} public void setPriority(Priority priority){this.priority=priority;}
  public String getCategory(){return category;} public void setCategory(String category){this.category=category;}
  public String getAssignee(){return assignee;} public void setAssignee(String assignee){this.assignee=assignee;}
  public String getCustomerEmail(){return customerEmail;} public void setCustomerEmail(String customerEmail){this.customerEmail=customerEmail;}
  public String getCustomerTier(){return customerTier;} public void setCustomerTier(String customerTier){this.customerTier=customerTier;}
  public boolean isSlaRisk(){return slaRisk;} public void setSlaRisk(boolean slaRisk){this.slaRisk=slaRisk;}
  public Instant getCreatedAt(){return createdAt;} public void setCreatedAt(Instant createdAt){this.createdAt=createdAt;}
  public Instant getUpdatedAt(){return updatedAt;} public void setUpdatedAt(Instant updatedAt){this.updatedAt=updatedAt;}
}
