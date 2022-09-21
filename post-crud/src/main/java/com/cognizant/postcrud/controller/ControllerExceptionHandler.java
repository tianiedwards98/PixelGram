package com.cognizant.postcrud.controller;

import com.cognizant.postcrud.model.CustomErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(value = IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<CustomErrorResponse> someIllegalArgumentException(IllegalArgumentException e) {
        CustomErrorResponse error = new CustomErrorResponse(HttpStatus.BAD_REQUEST.toString(), e.getMessage());
        error.setStatus((HttpStatus.BAD_REQUEST.value()));
        error.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);

    }
}
