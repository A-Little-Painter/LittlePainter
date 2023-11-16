package com.yehah.image.service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.yehah.image.dto.request.AddChildWorkTaleReqDto;
import com.yehah.image.dto.response.SaveMyAnimalResDto;
import com.yehah.image.dto.response.TempSaveResDto;
import com.yehah.image.dto.response.UploadS3MypageResDto;
import com.yehah.image.dto.response.UploadS3MypageTaleResDto;
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

	public Mono<List<UploadS3MypageTaleResDto>> addChildWorkTale(List<AddChildWorkTaleReqDto> addChildWorkReqDtoList) throws
		IOException {
		List<UploadS3MypageTaleResDto> result = new ArrayList<>();
		for(AddChildWorkTaleReqDto reqDto : addChildWorkReqDtoList) {
			if(reqDto.getUrlImage().isBlank()){
				throw new CustomException(ExceptionEnum.IMAGE_EMPTY);
			}

			Date currentDate = new Date();
			SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMyyyyHHmmss");
			String formattedDate = dateFormat.format(currentDate) + "-" + UUID.randomUUID();

			String dirName = "child-work/tale/" + formattedDate;

			String imageUrl = s3Util.update(reqDto.getUrlImage().substring(54), dirName + "img." + StringUtils.getFilenameExtension(reqDto.getUrlImage()));

			String gifUrl = (reqDto.getUrlGif().isBlank()) ? null : s3Util.update(reqDto.getUrlGif().substring(54), dirName + "gif." + StringUtils.getFilenameExtension(reqDto.getUrlGif()));

			UploadS3MypageTaleResDto uploadS3MypageTaleResDto =  UploadS3MypageTaleResDto.builder()
				.talePageId(reqDto.getTalePageId())
				.imageFileUrl(imageUrl)
				.gifFileUrl(gifUrl)
				.build();
			result.add(uploadS3MypageTaleResDto);
		}

		return Mono.just(result);
	}

	public Mono<UploadS3MypageResDto> addChildWork(String userId, String category, String tempImageUrl, String tempGifUrl) throws IOException {
		if(tempImageUrl.isBlank()){
			throw new CustomException(ExceptionEnum.IMAGE_EMPTY);
		} else if(category.isBlank()){
			throw new CustomException(ExceptionEnum.CATEGORY_EMPTY);
		}

		Date currentDate = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMyyyyHHmmss");
		String formattedDate = userId + "-" + dateFormat.format(currentDate);

		if(category.equals("tale")){
			formattedDate = userId + "-" + UUID.randomUUID();
		}

		try {
			WorkCategory workCategory = WorkCategory.valueOf(category);
		} catch (IllegalArgumentException e) {
			throw new CustomException(ExceptionEnum.CATEGORY_NOT_FOUND);
		}
		String dirName = "child-work/" + category +"/" + formattedDate;

		String imageUrl = s3Util.update(tempImageUrl.substring(54), dirName + "img." + StringUtils.getFilenameExtension(tempImageUrl));
		String gifUrl = (tempGifUrl.isBlank()) ? null : s3Util.update(tempGifUrl.substring(54), dirName + "gif." + StringUtils.getFilenameExtension(tempGifUrl));

		UploadS3MypageResDto result =  UploadS3MypageResDto.builder()
			.imageFileUrl(imageUrl)
			.gifFileUrl(gifUrl)
			.build();

		return Mono.just(result);
	}

	public Mono<TempSaveResDto> uploadTempFiles(MultipartFile imageFile, MultipartFile gifFile) throws IOException {
		if(imageFile.isEmpty()){
			throw new CustomException(ExceptionEnum.IMAGE_EMPTY);
		}

		SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMyyyy");
		String formattedDate = dateFormat.format(new Date()) + "/" + UUID.randomUUID();

		// image S3 저장
		String tempImageUrl = s3Util.upload(imageFile, "temp/" + formattedDate + "img");

		// gif S3 저장
		String tempGifUrl = null;
		if(gifFile != null){
			tempGifUrl = s3Util.upload(gifFile, "temp/" + formattedDate + "gif");
		}

		TempSaveResDto tempSaveResDto = TempSaveResDto.builder()
			.imageUrl(tempImageUrl)
			.gifUrl(tempGifUrl)
			.build();

		return Mono.just(tempSaveResDto);
	}

}
