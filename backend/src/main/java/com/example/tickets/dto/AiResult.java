package com.example.tickets.dto;
import com.example.tickets.model.Priority;
public record AiResult(String summary, String category, Priority priority, String recommendedTeam, String nextBestAction, boolean slaRisk) {}
