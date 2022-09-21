package com.cognizant.kpusercrud.models;

public class UnauthorizedUserException extends RuntimeException {

    public UnauthorizedUserException() {}

    public UnauthorizedUserException(String message) {
        super(message);
    }

}
