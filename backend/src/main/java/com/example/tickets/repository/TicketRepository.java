package com.example.tickets.repository;

import com.example.tickets.model.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
  @Query("""
    select t from Ticket t
    where (:status is null or t.status = :status)
      and (:priority is null or t.priority = :priority)
      and (:q is null or lower(t.title) like lower(concat('%', :q, '%')) or lower(t.description) like lower(concat('%', :q, '%')))
  """)
  Page<Ticket> search(@Param("q") String q, @Param("status") TicketStatus status, @Param("priority") Priority priority, Pageable pageable);
  long countBySlaRiskTrue();
  long countByPriority(Priority priority);
  long countByStatus(TicketStatus status);
}
