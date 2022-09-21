package com.cognizant.usercrud.controllers;

import com.cognizant.usercrud.exceptions.InvalidUsernameException;
import com.cognizant.usercrud.exceptions.MissingUsernameException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
@RequestMapping(produces = "application/json")
public class UserControllerExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({MissingUsernameException.class})
    public ResponseEntity<Object> handleMissingUsernameException(MissingUsernameException ex,
                                                                 WebRequest request) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({InvalidUsernameException.class})
    public ResponseEntity<Object> handleMissingUsernameException(InvalidUsernameException ex,
                                                                 WebRequest request) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

}
