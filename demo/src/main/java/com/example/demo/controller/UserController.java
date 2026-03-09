
package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Users;
import com.example.demo.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:4173", "http://127.0.0.1:5174"}, allowCredentials = "true")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HttpSession session;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users u) {
        Users byEmail = userRepository.findByEmail(u.getEmail());
        if (byEmail != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        Users byUsername = userRepository.findByUsername(u.getUsername());
        if (byUsername != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        try {
            userRepository.save(u);
            return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid data or duplicate constraint");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users u) {
        Users existingUser = userRepository.findByEmail(u.getEmail());

        if (existingUser != null && existingUser.getPassword().equals(u.getPassword())) {
            session.setAttribute("loggedInUser", existingUser.getId());
            Map<String,String> response=new HashMap<>();
            response.put("role",existingUser.getRole());
            response.put("email",existingUser.getEmail());

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid username or password");
    }
}