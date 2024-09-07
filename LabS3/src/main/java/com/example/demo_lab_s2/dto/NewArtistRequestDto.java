package com.example.demo_lab_s2.dto;


import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class NewArtistRequestDto {

    @NotNull
    @Size(min = 1, max = 100)
    private String name;

    @NotNull
    @Size(max = 1000)
    private String bio;

    @NotNull
    @Past
    private LocalDate birthDate;
}
