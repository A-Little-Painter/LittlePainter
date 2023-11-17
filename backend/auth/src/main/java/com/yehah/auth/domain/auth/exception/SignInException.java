package com.yehah.auth.domain.auth.exception;

public class SignInException extends RuntimeException{
    public SignInException(String message){
        super(message);
    }
}
