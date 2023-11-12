package com.yehah.draw.domain.animal.controller;

import com.yehah.draw.domain.animal.exception.SaveImageException;
import com.yehah.draw.domain.animal.exception.SimilarityCheckException;
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

    // NOTE : 이미지를 S3에 저장할 수 없습니다.
    @ExceptionHandler
    public ResponseEntity<?> handlerSaveImageException(SaveImageException e){
        return ResponseEntity.status(404).body(e.getMessage());
    }
}
