package com.yehah.image.dto.request;

import org.springframework.web.bind.annotation.RequestPart;

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
public class AddChildWorkReqDto {
	Long userId;
	String category;
	String imageUrl;
	String gifUrl;
}
