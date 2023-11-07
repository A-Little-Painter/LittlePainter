package com.yehah.draw.domain.tale_page.dto.response;

public interface TalePageResDto {
	Long getId();
	int getPageNumber();
	String getUrlBackground();
	String getUrlSound();
	String getNarrationBefore();
	String getNarrationAfter();
	String getRequestCharacter();
	String getUrlOriginal();
	String getUrlTrace();
}
