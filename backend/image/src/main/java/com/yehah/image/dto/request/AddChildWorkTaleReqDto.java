package com.yehah.image.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddChildWorkTaleReqDto {
	// Long userId;
	Long talePageId;
	String urlImage;
	String urlGif;
}
