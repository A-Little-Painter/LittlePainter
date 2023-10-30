package com.yehah.auth.domain.auth.controller;

import com.yehah.auth.domain.auth.exception.ExpiredAuthCodeException;
import com.yehah.auth.domain.auth.exception.InvalidCodeException;
import com.yehah.auth.domain.auth.exception.SignInException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AuthControllerAdvice {
    @ExceptionHandler
    public ResponseEntity<?> handleExpiredAuthCodeException(ExpiredAuthCodeException e){
        return ResponseEntity.status(409).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<?> handleInvalidCodeException(InvalidCodeException e){
        return ResponseEntity.status(404).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<?> handleSignInException(SignInException e){
        return ResponseEntity.status(401).body(e.getMessage());
    }
}
