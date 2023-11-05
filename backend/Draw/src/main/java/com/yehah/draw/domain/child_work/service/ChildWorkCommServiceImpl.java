package com.yehah.draw.domain.child_work.service;

import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.yehah.draw.domain.child_work.dto.response.UploadS3MypageResDto;

import jakarta.servlet.http.Part;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChildWorkCommServiceImpl implements ChildWorkCommService{

	private final WebClient imageWebClient;

	public Mono<UploadS3MypageResDto> postS3MyPage(String category, Long workId, MultipartFile imageFile, MultipartFile gifFile) {

		MultipartBodyBuilder builder = new MultipartBodyBuilder();
		builder.part("userId", 1L);
		builder.part("category", category);
		builder.part("imageFile", imageFile.getResource());
		builder.part("gifFile", gifFile.getResource());

		return imageWebClient
			.post()
			.uri("/comm/childWork")
			.contentType(MediaType.MULTIPART_FORM_DATA)
			.body(BodyInserters.fromMultipartData(builder.build()))
			.retrieve()
			.bodyToMono(UploadS3MypageResDto.class)
			.doOnSuccess(response -> {
				log.info("Image uploaded successfully!");
			})
			.doOnError(error -> {
				log.error("Failed to upload image: {}");
			});
	}

}
