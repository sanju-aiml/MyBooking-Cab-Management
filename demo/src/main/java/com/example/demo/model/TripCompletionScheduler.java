package com.example.demo.model;

// ...existing code...
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.DriverRepository;

@Component
public class TripCompletionScheduler {

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private DriverRepository driverRepo;

    @Scheduled(fixedRate = 60000) // Runs every 1 minute
    public void checkTrips() {
        List<Booking> allBookings = bookingRepo.findAll();
        System.out.println("Checking trips at " + LocalDateTime.now());

        for (Booking booking : allBookings) {
            if (!booking.isCompleted() && booking.getDriverEmail() != null) {
                LocalDateTime bookTime = booking.getCreatedAt();
                if (Duration.between(bookTime, LocalDateTime.now()).toMinutes() >= booking.getDurationMin()) {
                    booking.setStatus("TRIP_COMPLETED");
                    booking.setCompleted(true);
                    bookingRepo.save(booking);
                    System.out.println("Trip " + booking.getId() + " marked as completed due to timeout.");

                    Driver driver = driverRepo.findByEmail(booking.getDriverEmail());
                    if (driver != null) {
                        driver.setAvailable(true);
                        driverRepo.save(driver);
                        System.out.println("Driver " + driver.getEmail() + " is now available.");
                    } else {
                        System.out.println("Driver not found for email: " + booking.getDriverEmail());
                    }
                }
            }
        }
    }

    @Scheduled(fixedRate = 30000) // Runs every 30 seconds
    public void assignWaitingBookings() {
        List<Booking> waitingBookings = bookingRepo.findAllByStatus("BOOKED"); // Ensure method exists
        System.out.println("Checking waiting bookings at " + LocalDateTime.now());

        for (Booking booking : waitingBookings) {
            List<Driver> availableDrivers = driverRepo.findByCabTypeAndAvailable(booking.getCabType(), true);
            if (!availableDrivers.isEmpty()) {
                Driver driver = availableDrivers.get(0);
                booking.setDriverEmail(driver.getEmail());
                booking.setStatus("ASSIGNED");

                driver.setAvailable(false);
                driverRepo.save(driver);
                bookingRepo.save(booking);

                System.out.println("Assigned driver " + driver.getEmail() + " to booking " + booking.getId());
            }
        }
    }
}