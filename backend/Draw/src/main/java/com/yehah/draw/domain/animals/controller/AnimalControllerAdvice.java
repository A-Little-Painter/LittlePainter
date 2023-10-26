package com.yehah.draw.domain.animals.controller;

import com.yehah.draw.domain.animals.exception.SimilarityCheckException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AnimalControllerAdvice {

    // NOTE : 유사도 검사 측정에 실패했습니다.
    @ExceptionHandler
    public ResponseEntity<?> handleSimilarityCheckException(SimilarityCheckException e){
        return ResponseEntity.status(404).body(e.getMessage());
    }
}
