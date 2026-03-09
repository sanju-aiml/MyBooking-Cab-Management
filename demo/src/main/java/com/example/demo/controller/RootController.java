package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:4173", "http://127.0.0.1:5174"})
public class RootController {

    @GetMapping("/")
    public String root() {
        return "Booking Management API is running";
    }
}