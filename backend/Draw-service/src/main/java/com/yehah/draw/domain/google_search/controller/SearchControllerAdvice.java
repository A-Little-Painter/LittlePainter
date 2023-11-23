package com.yehah.draw.domain.google_search.controller;

import com.yehah.draw.domain.google_search.exception.ImageException;
import com.yehah.draw.domain.google_search.exception.JSONParseException;
import com.yehah.draw.domain.google_search.exception.NetworkException;
import com.yehah.draw.domain.google_search.exception.NotFoundNameException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class SearchControllerAdvice {
    @ExceptionHandler
    public ResponseEntity<?> handleImageException(ImageException e){
        return ResponseEntity.status(502).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<?> handleJSONParseException(JSONParseException e){
        return ResponseEntity.status(503).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<?> handleNetworkException(NetworkException e){
        return ResponseEntity.status(504).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<?> handleNotFoundNameException(NotFoundNameException e){
        return ResponseEntity.status(505).body(e.getMessage());
    }
}
