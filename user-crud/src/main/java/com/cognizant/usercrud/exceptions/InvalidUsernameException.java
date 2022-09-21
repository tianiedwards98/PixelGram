package com.cognizant.usercrud.exceptions;

public class InvalidUsernameException extends RuntimeException{
    public InvalidUsernameException(){}

    public InvalidUsernameException(String message){
        super(message);
    }
}
