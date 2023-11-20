package com.yehah.auth.domain.auth.exception;

public class InvalidCodeException extends RuntimeException{
    public InvalidCodeException(String message){
        super(message);
    }
}
