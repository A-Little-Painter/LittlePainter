package com.yehah.user.domain.userAuth.controller;

import com.yehah.user.domain.userAuth.exception.AlreadyUsedEmailException;
import com.yehah.user.domain.userAuth.exception.UserDeletedException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserAuthControllerAdvice {
    @ExceptionHandler
    public ResponseEntity<String> handleAlreadyUsedEmailException(AlreadyUsedEmailException e){
        return ResponseEntity.status(509).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e){
        return ResponseEntity.status(510).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<String> handleUserDeletedException(UserDeletedException e){
        return ResponseEntity.status(511).body(e.getMessage());
    }
}
