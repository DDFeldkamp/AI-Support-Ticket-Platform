package com.example.tickets;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class TicketPlatformApplication {
  public static void main(String[] args) {
    SpringApplication.run(TicketPlatformApplication.class, args);
  }
}
