package com.yehah.image.controller;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yehah.image.dto.SaveImageRequestDto;
import com.yehah.image.dto.SaveImageResponseDto;
import com.yehah.image.dto.SaveMyAnimalRequestDto;
import com.yehah.image.dto.SaveMyAnimalResponseDto;
import com.yehah.image.service.ImageService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Tag(name = "Image Controller", description = "Image Controller의 API입니다.")
@RestController
@RequestMapping("/api/v1/images")
@RequiredArgsConstructor
public class ImageController {

	private final ImageService imageService;

	@Operation(summary = "S3- 마이페이지에 그림 저장하기", description = "(draw -> image) aws s3에 마이페이지에 저장할 그림을 저장한다.")
	@PostMapping(value = "/myWork", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SaveImageResponseDto> uploadMyPage(@ModelAttribute SaveImageRequestDto saveImageRequestDto) throws IOException {
		log.debug("uploadMyPage()");
		return ResponseEntity.status(201).body(imageService.uploadMyPage(saveImageRequestDto));
	}

	@Operation(summary = "S3- 내 동물 사진 올리기", description = "(draw -> image) aws s3에 내 동물 사진 올리기에 업로드할 사진을 저장한다.")
	@PostMapping(value = "/myAnimal", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SaveMyAnimalResponseDto> uploadMyAnimalImage(@ModelAttribute SaveMyAnimalRequestDto saveMyAnimalRequestDto) throws IOException {
		log.debug("uploadMyAnimalImage()");
		return ResponseEntity.status(201).body(imageService.uploadMyAnimalImage(saveMyAnimalRequestDto));
	}

}
