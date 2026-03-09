package com.example.demo.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Booking;
import com.example.demo.model.Driver;
import com.example.demo.repository.DriverRepository;
import com.example.demo.repository.HrRepository;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:4173", "http://127.0.0.1:5174"}, allowCredentials = "true")
@RequestMapping("/api/hr")
public class HrController {

    @Autowired
    DriverRepository driverRepo;

    @Autowired
    HrRepository bookingRepo;

    @PostMapping("/book/{hremail}")
    public String bookCab(@PathVariable String hremail, @RequestBody Booking booking) {
        booking.setBookingDate(LocalDate.now().toString());
        booking.setStatus("BOOKED");
        booking.setHrEmail(hremail);

        
        List<Driver> drivers =  driverRepo.findByCabTypeAndAvailable(booking.getCabType(), true);
        if (!drivers.isEmpty()) {
            Driver assignedDriver = drivers.get(0); 
            booking.setDriverEmail(assignedDriver.getEmail());
            booking.setStatus("ASSIGNED");

           
            assignedDriver.setAvailable(false);
            driverRepo.save(assignedDriver);
        } else {
            booking.setStatus("PENDING"); // Optional: mark as pending if no driver found
        }

        bookingRepo.save(booking);
        return "Booking successful";
    }
}
