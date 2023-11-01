package com.yehah.image.service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.yehah.image.dto.response.SaveImageResDto;
import com.yehah.image.dto.response.SaveMyAnimalResDto;
import com.yehah.image.exception.CustomException;
import com.yehah.image.exception.ExceptionEnum;
import com.yehah.image.s3.S3Util;
import com.yehah.image.common.WorkCategory;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@Service
public class ImageService {

	private final S3Util s3Util;

	public String uploadMyPage(Long userId, String category, MultipartFile image) throws IOException {
		if(image.isEmpty()){
			throw new CustomException(ExceptionEnum.IMAGE_EMPTY);
		} else if(category.isBlank()){
			throw new CustomException(ExceptionEnum.CATEGORY_EMPTY);
		}

		Date currentDate = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMyyyyHHmmss");
		String formattedDate = userId.toString() + "-" + dateFormat.format(currentDate);

		try {
			WorkCategory workCategory = WorkCategory.valueOf(category);
		} catch (IllegalArgumentException e) {
			throw new CustomException(ExceptionEnum.CATEGORY_NOT_FOUND);
		}
		String dirName = "child-work/" + category +"/" + formattedDate;

		return s3Util.upload(image, dirName);
	}

	public Mono<SaveMyAnimalResDto> uploadMyAnimalImage(MultipartFile originalImage, MultipartFile traceImage, Long userId) throws IOException {
		if(originalImage.isEmpty() || traceImage.isEmpty()){
			throw new CustomException(ExceptionEnum.IMAGE_EMPTY);
		}

		Date currentDate = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMyyyyHHmmss");
		String formattedDate = userId + "-" + dateFormat.format(currentDate);

		// 원본이미지 S3 저장
		String originalUrl = s3Util.upload(originalImage, "friendsAnimal/original/" + formattedDate);

		// 테두리 S3 저장
		String traceUrl = s3Util.upload(traceImage, "friendsAnimal/trace/" + formattedDate);

		SaveMyAnimalResDto result =  SaveMyAnimalResDto.builder()
			.originalUrl(originalUrl)
			.traceUrl(traceUrl)
			.build();

		return Mono.just(result);
	}

}
