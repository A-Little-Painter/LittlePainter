package com.yehah.auth.domain.auth.exception;

public class DatabaseInsertException extends RuntimeException{
    public DatabaseInsertException(String message){
        super(message);
    }
}
