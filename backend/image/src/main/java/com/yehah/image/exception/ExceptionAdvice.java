package com.yehah.image.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {
	@ExceptionHandler(CustomException.class)
	public ResponseEntity<ExceptionResponse> exceptionHandler(CustomException e){
		ExceptionEnum exceptionEnum = e.getExceptionEnum();
		return ResponseEntity
			.status(exceptionEnum.getStatus())
			.body(ExceptionResponse.builder()
				.errorCode(exceptionEnum.getCode())
				.description(exceptionEnum.getDescription())
				.build());
	}
}