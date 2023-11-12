package com.yehah.draw.domain.tale_page.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GetTaleCharacterResDto {
	Long taleCharacterid;
	String characterName;
	String urlOriginal;
	String urlGif;
	String urlTrace;
	String movement;
	Integer startX;
	Integer startY;
	Integer endX;
	Integer endY;
}
