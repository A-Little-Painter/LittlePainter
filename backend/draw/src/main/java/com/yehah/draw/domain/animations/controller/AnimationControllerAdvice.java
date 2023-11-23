package com.yehah.draw.domain.animations.controller;

import com.yehah.draw.domain.animations.exception.AnimationBorderExtractionException;
import com.yehah.draw.domain.animations.exception.AnimationChangeException;
import com.yehah.draw.domain.animations.exception.AnimationDataSaveException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AnimationControllerAdvice {

    // NOTE : 이미지를 GIF를 변환할 수 없습니다.
    @ExceptionHandler
    public ResponseEntity<?> HandleAnimationChangeException(AnimationChangeException e){
        return ResponseEntity.status(404).body(e.getMessage());
    }

    // NOTE : 테두리 내부 영역의 이미지를 추출할 수 없습니다.
    @ExceptionHandler
    public ResponseEntity<?> HandleAnimationBorderExtractionException(AnimationBorderExtractionException e){
        return ResponseEntity.status(404).body(e.getMessage());
    }

    // NOTE : S3에 이미지를 저장할 수 없습니다.
    @ExceptionHandler
    public ResponseEntity<?> HandleAnimationDataSaveException(AnimationDataSaveException e){
        return ResponseEntity.status(404).body(e.getMessage());
    }
}
