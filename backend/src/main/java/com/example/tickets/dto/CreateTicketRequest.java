package com.example.tickets.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
public record CreateTicketRequest(@NotBlank String title, @NotBlank String description, @Email String customerEmail, String customerTier) {}
