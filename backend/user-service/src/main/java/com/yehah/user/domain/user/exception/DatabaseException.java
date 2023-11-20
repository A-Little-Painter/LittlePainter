package com.yehah.user.domain.user.exception;

public class DatabaseException extends RuntimeException{
    public DatabaseException(String message){
        super(message);
    }
}
