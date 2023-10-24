package com.yehah.image.dto;

import org.springframework.web.multipart.MultipartFile;

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
public class SaveMyAnimalRequestDto {
	Long userId;
	MultipartFile originalImage;
	MultipartFile traceImage;
}
