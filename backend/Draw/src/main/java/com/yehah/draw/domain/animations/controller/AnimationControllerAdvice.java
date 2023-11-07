package com.yehah.draw.domain.animations.controller;

import com.yehah.draw.domain.animations.exception.AnimationChangeException;
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
}
