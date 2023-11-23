package com.yehah.user.domain.userAuth.exception;

public class AlreadyUsedEmailException extends RuntimeException{
    public AlreadyUsedEmailException(String message){
        super(message);
    }
}
