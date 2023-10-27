package com.yehah.auth.domain.auth.exception;

public class ExpiredAuthCodeException extends RuntimeException{
    public ExpiredAuthCodeException(String message){
        super(message);
    }
}
