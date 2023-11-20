package com.yehah.auth.domain.auth.controller;

import com.yehah.auth.domain.auth.exception.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AuthControllerAdvice {
    @ExceptionHandler
    public ResponseEntity<?> handleExpiredAuthCodeException(ExpiredAuthCodeException e){
        return ResponseEntity.status(503).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<?> handleInvalidCodeException(InvalidCodeException e){
        return ResponseEntity.status(504).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<?> handleEmailSendingException(EmailSendingException e){
        return ResponseEntity.status(501).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<?> handleDatabaseInsertException(DatabaseInsertException e){
        return ResponseEntity.status(502).body(e.getMessage());
    }
}
