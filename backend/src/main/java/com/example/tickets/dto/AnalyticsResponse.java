package com.example.tickets.dto;
import java.util.Map;
public record AnalyticsResponse(long totalTickets, long slaRiskTickets, Map<String, Long> byPriority, Map<String, Long> byStatus) {}
