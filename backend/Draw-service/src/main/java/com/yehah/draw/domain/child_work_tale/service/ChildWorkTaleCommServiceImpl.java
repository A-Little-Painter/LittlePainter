package com.yehah.draw.domain.child_work_tale.service;

import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.yehah.draw.domain.child_work.dto.request.SaveS3ChildWorkReqDto;
import com.yehah.draw.domain.child_work.dto.response.UploadS3MypageResDto;
import com.yehah.draw.domain.child_work_tale.dto.request.AddChildWorkTaleReqDto;
import com.yehah.draw.domain.child_work_tale.dto.response.UploadS3MypageTaleResDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChildWorkTaleCommServiceImpl implements ChildWorkTaleCommService{

	private final WebClient imageWebClient;

	public Mono<List<UploadS3MypageTaleResDto>> postS3MyPage(List<AddChildWorkTaleReqDto> addChildWorkTaleReqDtoList) {
		return imageWebClient
			.post()
			.uri("/comm/child-work-tale")
			.contentType(MediaType.APPLICATION_JSON)
			.bodyValue(addChildWorkTaleReqDtoList)
			.retrieve()
			.bodyToMono(new ParameterizedTypeReference<List<UploadS3MypageTaleResDto>>() {})
			.doOnSuccess(response -> {
				log.info("Image uploaded successfully!");
			})
			.doOnError(error -> {
				log.error("Failed to upload image: {}", error.getMessage());
			});
	}

}
