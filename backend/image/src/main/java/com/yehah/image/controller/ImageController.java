package com.yehah.image.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.yehah.image.dto.request.AddChildWorkReqDto;
import com.yehah.image.dto.request.AddChildWorkTaleReqDto;
import com.yehah.image.dto.response.SaveMyAnimalResDto;
import com.yehah.image.dto.response.TempSaveResDto;
import com.yehah.image.dto.response.UploadS3MypageResDto;
import com.yehah.image.dto.response.UploadS3MypageTaleResDto;
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

	@Operation(summary = "S3- 임시 파일(img, gif) 저장하기", description = "(ALL) aws s3에 gif 파일을 임시로 저장한다.")
	@PostMapping(value = "/temp")
	public Mono<TempSaveResDto> uploadTempGif(@RequestPart(value="imageFile") MultipartFile imageFile, @RequestPart(value="gifFile", required = false) MultipartFile gifFile) throws IOException {
		log.info("uploadTempGif()");
		return imageService.uploadTempFiles(imageFile, gifFile);
	}

	@Operation(summary = "S3- 내 동물 사진 올리기", description = "(USER) aws s3에 내 동물 사진 올리기에 업로드할 사진을 저장한다.")
	@PostMapping(value = "/myAnimal", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public Mono<SaveMyAnimalResDto> uploadMyAnimalImage(@RequestPart(value="originalImage") MultipartFile originalImage, @RequestPart(value="traceImage") MultipartFile traceImage, @RequestPart(value="userId") Long userId) throws IOException{
		log.info("uploadImage() : originalImage = {}, traceImage = {}, userId = {}", originalImage.getOriginalFilename(), traceImage.getOriginalFilename(), userId);
		Mono<SaveMyAnimalResDto> result = imageService.uploadMyAnimalImage(originalImage, traceImage, userId);
		return result;
	}

	@Operation(summary = "S3- 마이페이지에 그림 저장하기", description = "(USER) aws s3에 마이페이지에 저장할 그림을 저장한다.")
	@PostMapping(value = "/childWork")
	public Mono<UploadS3MypageResDto> addChildWork(@RequestBody AddChildWorkReqDto addChildWorkReqDto) throws IOException {
		log.info("addChildWork() : userId = {}, category = {}, imageUrl = {}, gifUrl = {}", addChildWorkReqDto.getUserId().toString(), addChildWorkReqDto.getCategory(), addChildWorkReqDto.getImageUrl(), addChildWorkReqDto.getGifUrl());
		return imageService.addChildWork(addChildWorkReqDto.getUserId().toString(), addChildWorkReqDto.getCategory(), addChildWorkReqDto.getImageUrl(), addChildWorkReqDto.getGifUrl());
	}

	@Operation(summary = "S3- 마이페이지에 동화 그림 저장하기", description = "(USER) aws s3에 마이페이지에 저장할 그림을 저장한다.")
	@PostMapping(value = "/child-work-tale")
	public Mono<List<UploadS3MypageTaleResDto>> addChildWorkTale(@RequestBody List<AddChildWorkTaleReqDto> addChildWorkTaleReqDtoList) throws IOException {
		log.info("addChildWorkTale() : ");

		for(AddChildWorkTaleReqDto reqDto : addChildWorkTaleReqDtoList) {
			System.out.println(reqDto.getTalePageId()  + " : " + reqDto.getUrlImage() + " : " + reqDto.getUrlGif());
		}
		return imageService.addChildWorkTale(addChildWorkTaleReqDtoList);
	}

	/*
	@Operation(summary = "S3- 마이페이지에 그림 저장하기", description = "(draw -> image) aws s3에 마이페이지에 저장할 그림을 저장한다.")
	@PostMapping(value = "/myWork")
	public String uploadMyPage(@RequestParam Long userId, @RequestParam String category, @RequestParam MultipartFile image) throws IOException {
		log.info("uploadMyPage() : image = {}, category = {}, userId = {}", image, category, userId);
		return imageService.uploadMyPage(userId, category, image);
	}
	*/

}
