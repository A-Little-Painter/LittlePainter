package com.yehah.image.controller;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.yehah.image.dto.response.SaveImageResDto;
import com.yehah.image.dto.response.SaveMyAnimalResDto;
import com.yehah.image.service.ImageService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Tag(name = "Image Controller", description = "Image Controller의 API입니다.")
@RestController
@RequestMapping("/api/v1/images/comm")
@RequiredArgsConstructor
public class ImageController {

	private final ImageService imageService;

	@Operation(summary = "S3- 마이페이지에 그림 저장하기", description = "(draw -> image) aws s3에 마이페이지에 저장할 그림을 저장한다.")
	@PostMapping(value = "/myWork")
	public ResponseEntity<SaveImageResDto> uploadMyPage(@RequestParam Long userId,@RequestParam String category,@RequestParam MultipartFile image) throws IOException {
		log.info("uploadMyPage() : image = {}, category = {}, userId = {}", image, category, userId);
		return ResponseEntity.status(201).body(imageService.uploadMyPage(userId, category, image));
	}

	@Operation(summary = "S3- 내 동물 사진 올리기", description = "(최종본)(draw -> image) aws s3에 내 동물 사진 올리기에 업로드할 사진을 저장한다.")
	@PostMapping(value = "/myAnimal", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public Mono<SaveMyAnimalResDto> uploadMyAnimalImage(@RequestPart(value="originalImage") MultipartFile originalImage, @RequestPart(value="traceImage") MultipartFile traceImage, @RequestPart(value="userId") Long userId) throws IOException{
		log.info("uploadImage() : originalImage = {}, traceImage = {}, userId = {}", originalImage.getOriginalFilename(), traceImage.getOriginalFilename(), userId);
		Mono<SaveMyAnimalResDto> result = imageService.uploadMyAnimalImage(originalImage, traceImage, userId);
		return result;
	}

}
