package com.yehah.auth.domain.auth.exception;

public class EmailSendingException extends RuntimeException{
    public EmailSendingException(String message){
        super(message);
    }
}
