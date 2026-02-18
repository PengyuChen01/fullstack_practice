package com.example.studentbackend;

import com.example.studentbackend.entity.Student;
import com.example.studentbackend.repository.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private StudentRepository studentRepository;

    @BeforeEach
    void setUp() {
        studentRepository.deleteAll();
    }

    @Test
    void indexEndpoint_shouldReturnAllStudents() throws Exception {
        studentRepository.save(new Student("Jim", "Hawkins",
                LocalDateTime.of(2021, 2, 15, 19, 35, 0)));
        studentRepository.save(new Student("Sally", "Ride",
                LocalDateTime.of(2021, 2, 18, 16, 39, 0)));

        mockMvc.perform(get("/index"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].firstName", is("Jim")))
                .andExpect(jsonPath("$[0].lastName", is("Hawkins")))
                .andExpect(jsonPath("$[1].firstName", is("Sally")))
                .andExpect(jsonPath("$[1].lastName", is("Ride")));
    }

    @Test
    void indexEndpoint_shouldReturnEmptyListWhenNoStudents() throws Exception {
        mockMvc.perform(get("/index"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void createStudent_shouldReturnCreatedStudent() throws Exception {
        String studentJson = """
                {
                    "firstName": "John",
                    "lastName": "Doe",
                    "checkInTime": "2021-03-01T10:00:00"
                }
                """;

        mockMvc.perform(post("/api/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(studentJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.firstName", is("John")))
                .andExpect(jsonPath("$.lastName", is("Doe")))
                .andExpect(jsonPath("$.id", notNullValue()));
    }

    @Test
    void getStudentById_shouldReturnStudent() throws Exception {
        Student saved = studentRepository.save(new Student("Jane", "Smith",
                LocalDateTime.of(2021, 5, 10, 14, 0, 0)));

        mockMvc.perform(get("/api/students/" + saved.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName", is("Jane")))
                .andExpect(jsonPath("$.lastName", is("Smith")));
    }
}
