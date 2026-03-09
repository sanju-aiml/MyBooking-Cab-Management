package com.example.demo.repository;

import com.example.demo.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Integer> {
    List<Driver> findByCabTypeAndAvailable(String cabType, boolean available);

    Driver findByEmail(String email);
}