package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Booking;

public interface HrRepository extends JpaRepository<Booking,Integer> {

}
