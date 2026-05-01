package com.example.tickets.ai;
import com.example.tickets.dto.AiResult;
import com.example.tickets.model.Ticket;
public interface AiClient { AiResult analyze(Ticket ticket); }
