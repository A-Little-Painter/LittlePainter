//package com.yehah.draw.domain.child_work_tale.controller;
//
//import com.yehah.draw.domain.child_work_tale.exception.DataIntegrityException;
//import com.yehah.draw.domain.child_work_tale.exception.DatabaseAccessException;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//
//@ControllerAdvice
//public class ChildWorkTaleControllerAdvice {
//    @ExceptionHandler
//    public ResponseEntity<?> handleDatabaseAccessException(DatabaseAccessException e){
//        return ResponseEntity.status(502).body(e.getMessage());
//    }
//
//    @ExceptionHandler
//    public ResponseEntity<?> handleNullPointerException(NullPointerException e){
//        return ResponseEntity.status(503).body(e.getMessage());
//    }
//
//    @ExceptionHandler
//    public ResponseEntity<?> handleDataIntegrityException(DataIntegrityException e){
//        return ResponseEntity.status(504).body(e.getMessage());
//    }
//
//    @ExceptionHandler
//    public ResponseEntity<?> handleTransactionException(RuntimeException e){
//        return ResponseEntity.status(505).body(e.getMessage());
//    }
//}
