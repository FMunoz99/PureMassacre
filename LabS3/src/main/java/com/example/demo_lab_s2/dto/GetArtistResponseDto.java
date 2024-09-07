package com.example.demo_lab_s2.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class GetArtistResponseDto {
    private String name;
    private String bio;
    private String birthDate;
    private List<Long> songIdList = new ArrayList<>();
}
