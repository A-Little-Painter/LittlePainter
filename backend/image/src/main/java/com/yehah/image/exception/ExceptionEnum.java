package com.yehah.image.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ExceptionEnum {

	IMAGE_EMPTY(HttpStatus.BAD_REQUEST,4001,"이미지 파일은 필수값 입니다."),
	CATEGORY_EMPTY(HttpStatus.BAD_REQUEST,4002,"카테고리는 필수값 입니다."),
	CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND,4003,"카테고리가 올바르지 않습니다.");

	private HttpStatus status;
	private int code;
	private String description;

	private ExceptionEnum(HttpStatus status, int code, String description){
		this.code = code;
		this.status = status;
		this.description = description;
	}
}