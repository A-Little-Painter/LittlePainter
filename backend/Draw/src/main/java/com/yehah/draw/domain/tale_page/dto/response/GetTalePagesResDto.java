package com.yehah.draw.domain.tale_page.dto.response;

import java.util.List;

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
public class GetTalePagesResDto {
	Long talePageId;
	int pageNum;
	String urlBackground;
	String urlSound;
	String narration;
	Boolean drawing;
	List<GetTaleCharacterResDto> characters;
}
