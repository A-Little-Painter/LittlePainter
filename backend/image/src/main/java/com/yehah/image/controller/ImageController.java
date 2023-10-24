package com.yehah.image.controller;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/images")
@RequiredArgsConstructor
public class ImageController {

	private final Logger log = LoggerFactory.getLogger(this.getClass());
	private final ImageService imageService;

	@PostMapping(name = "S3- 마이페이지에 그림 저장하기", value = "/comm-myWork")
	public ResponseEntity<SaveImageResponseDto> uploadMyPage(@ModelAttribute SaveImageRequestDto saveImageRequestDto) throws IOException {
		log.debug("uploadMyPage()");
		return ResponseEntity.status(201).body(imageService.uploadMyPage(saveImageRequestDto));
	}

	@PostMapping(name = "S3- 내 동물 사진 올리기", value = "/comm-myAnimal")
	public ResponseEntity<SaveMyAnimalResponseDto> uploadMyAnimalImage(@ModelAttribute SaveMyAnimalRequestDto saveMyAnimalRequestDto) throws IOException {
		log.debug("uploadMyAnimalImage()");
		return ResponseEntity.status(201).body(imageService.uploadMyAnimalImage(saveMyAnimalRequestDto));
	}

}
