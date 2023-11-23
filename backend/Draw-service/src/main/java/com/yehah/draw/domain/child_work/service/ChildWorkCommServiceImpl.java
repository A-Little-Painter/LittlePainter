package com.yehah.draw.domain.child_work.service;

import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.yehah.draw.domain.child_work.dto.request.SaveS3ChildWorkReqDto;
import com.yehah.draw.domain.child_work.dto.response.UploadS3MypageResDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChildWorkCommServiceImpl implements ChildWorkCommService{

	private final WebClient imageWebClient;

	public Mono<UploadS3MypageResDto> postS3MyPage(String category, Long childId, String imageUrl, String gifUrl) {
		SaveS3ChildWorkReqDto saveS3ChildWorkReqDto = SaveS3ChildWorkReqDto.builder()
			.userId(childId)
			.category(category)
			.imageUrl(imageUrl)
			.gifUrl(gifUrl)
			.build();

		return imageWebClient
			.post()
			.uri("/comm/childWork")
			.contentType(MediaType.APPLICATION_JSON)
			// .body(BodyInserters.fromMultipartData(builder.build()))
			.bodyValue(saveS3ChildWorkReqDto)
			.retrieve()
			.bodyToMono(UploadS3MypageResDto.class)
			.doOnSuccess(response -> {
				log.info("Image uploaded successfully!");
			})
			.doOnError(error -> {
				log.error("Failed to upload image: {}", error.getMessage());
			});
	}

}
