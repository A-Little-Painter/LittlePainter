package com.yehah.draw.domain.tale.dto.response;

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
public class TaleListResDto {
	private Long id;
	private String title;
	private String urlCover;
	private Boolean isAvailable;
}