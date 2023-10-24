package com.yehah.image.service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.yehah.image.dto.SaveImageRequestDto;
import com.yehah.image.dto.SaveImageResponseDto;
import com.yehah.image.dto.SaveMyAnimalRequestDto;
import com.yehah.image.dto.SaveMyAnimalResponseDto;
import com.yehah.image.exception.CustomException;
import com.yehah.image.exception.ExceptionEnum;
import com.yehah.image.s3.S3Util;
import com.yehah.image.common.WorkCategory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ImageService {

	private final S3Util s3Util;

	public SaveImageResponseDto uploadMyPage(SaveImageRequestDto imageRequestDto) throws IOException {
		if(imageRequestDto.getImage().isEmpty()){
			throw new CustomException(ExceptionEnum.IMAGE_EMPTY);
		} else if(imageRequestDto.getCategory().isBlank()){
			throw new CustomException(ExceptionEnum.CATEGORY_EMPTY);
		}

		Date currentDate = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMyyyyHHmmss");
		String formattedDate = imageRequestDto.getUserId() + "-" + dateFormat.format(currentDate);

		try {
			WorkCategory workCategory = WorkCategory.valueOf(imageRequestDto.getCategory());
		} catch (IllegalArgumentException e) {
			throw new CustomException(ExceptionEnum.CATEGORY_NOT_FOUND);
		}
		String dirName = "child-work/" + imageRequestDto.getCategory() +"/" + formattedDate;

		return SaveImageResponseDto.builder()
			.imageUrl(s3Util.upload(imageRequestDto.getImage(), dirName))
			.build();
	}

	public SaveMyAnimalResponseDto uploadMyAnimalImage(SaveMyAnimalRequestDto saveMyAnimalRequestDto) throws IOException {
		if(saveMyAnimalRequestDto.getOriginalImage().isEmpty() || saveMyAnimalRequestDto.getTraceImage().isEmpty()){
			throw new CustomException(ExceptionEnum.IMAGE_EMPTY);
		}

		Date currentDate = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMyyyyHHmmss");
		String formattedDate = saveMyAnimalRequestDto.getUserId() + "-" + dateFormat.format(currentDate);

		// 원본이미지 S3 저장
		String originalUrl = s3Util.upload(saveMyAnimalRequestDto.getOriginalImage(), "friendsAnimal/original/" + formattedDate);

		// 테두리 S3 저장
		String traceUrl = s3Util.upload(saveMyAnimalRequestDto.getTraceImage(), "friendsAnimal/trace/" + formattedDate);

		return SaveMyAnimalResponseDto.builder()
			.originalUrl(originalUrl)
			.traceUrl(traceUrl)
			.build();
	}

}
