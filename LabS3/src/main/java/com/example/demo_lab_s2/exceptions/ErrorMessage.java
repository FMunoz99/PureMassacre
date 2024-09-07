package com.example.demo_lab_s2.exceptions;

import lombok.Data;

@Data
public class ErrorMessage {
    String message;
    String status;

    public ErrorMessage(String message, String status){
        this.message = message;
        this.status = status;
    }
}
