package com.yehah.user.domain.user.contoller;

import com.yehah.user.domain.user.exception.DTOConversionException;
import com.yehah.user.domain.user.exception.DatabaseException;
import com.yehah.user.domain.user.exception.NoDataFoundException;
import com.yehah.user.domain.user.exception.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserControllerAdvice {
    @ExceptionHandler
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException e) {
        return ResponseEntity.status(404).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<String> handleDTOConversionException(DTOConversionException e) {
        return ResponseEntity.status(402).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<String> handleDatabaseException(DatabaseException e){
        return ResponseEntity.status(400).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<String> handleNoDataFoundException(NoDataFoundException e){
        return ResponseEntity.status(401).body(e.getMessage());
    }
}
