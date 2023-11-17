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
        return ResponseEntity.status(514).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<String> handleDTOConversionException(DTOConversionException e) {
        return ResponseEntity.status(513).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<String> handleDatabaseException(DatabaseException e){
        return ResponseEntity.status(511).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<String> handleNoDataFoundException(NoDataFoundException e){
        return ResponseEntity.status(512).body(e.getMessage());
    }
}
