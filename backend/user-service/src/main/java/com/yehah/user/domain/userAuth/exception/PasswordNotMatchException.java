package com.yehah.user.domain.userAuth.exception;

public class PasswordNotMatchException extends RuntimeException{
    public PasswordNotMatchException(String message){
        super(message);
    }
}
