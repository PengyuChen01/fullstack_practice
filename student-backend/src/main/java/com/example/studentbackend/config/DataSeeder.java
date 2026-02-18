package com.example.studentbackend.config;

import com.example.studentbackend.entity.Student;
import com.example.studentbackend.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(StudentRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Student(
                        "Jim",
                        "Hawkins",
                        LocalDateTime.of(2021, 2, 15, 19, 35, 0)
                ));
                repository.save(new Student(
                        "Sally",
                        "Ride",
                        LocalDateTime.of(2021, 2, 18, 16, 39, 0)
                ));
                System.out.println("Database seeded with 2 students.");
            }
        };
    }
}
