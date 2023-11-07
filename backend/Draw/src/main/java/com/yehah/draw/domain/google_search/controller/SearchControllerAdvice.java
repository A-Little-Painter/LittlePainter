//package com.yehah.draw.domain.google_search.controller;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//
//@ControllerAdvice
//public class SearchControllerAdvice {
//    @ExceptionHandler
//    public ResponseEntity<?> handleImageException(RuntimeException e){
//        return ResponseEntity.status(502).body(e.getMessage());
//    }
//
//    @ExceptionHandler
//    public ResponseEntity<?> handleJSONParseException(RuntimeException e){
//        return ResponseEntity.status(503).body(e.getMessage());
//    }
//
//    @ExceptionHandler
//    public ResponseEntity<?> handleNetworkException(RuntimeException e){
//        return ResponseEntity.status(504).body(e.getMessage());
//    }
//}
