package com.cognizant.usercrud.exceptions;

public class MissingUsernameException extends Exception{

    public MissingUsernameException(){

    }

    public MissingUsernameException(String message){
        super(message);
    }
}
