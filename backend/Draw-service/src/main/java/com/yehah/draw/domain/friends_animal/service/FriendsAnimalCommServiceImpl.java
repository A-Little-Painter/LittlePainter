package com.yehah.draw.domain.friends_animal.service;

import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.yehah.draw.domain.animal_type.entity.AnimalType;
import com.yehah.draw.domain.animal_type.repository.AnimalTypeRepository;
import com.yehah.draw.domain.friends_animal.dto.request.AddFriendsAnimalReqDto;
import com.yehah.draw.domain.friends_animal.entity.FriendsAnimal;
import com.yehah.draw.domain.friends_animal.repository.FriendsAnimalRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendsAnimalCommServiceImpl implements FriendsAnimalCommService{

	private final AnimalTypeRepository animalTypeRepository;
	private final FriendsAnimalRepository friendsAnimalRepository;

	public Long addMyAnimalImage(AddFriendsAnimalReqDto addFriendsAnimalReqDto){
		/*
		MultipartBodyBuilder builder = new MultipartBodyBuilder();
		builder.part("originalImage", originalImage.getResource());
		builder.part("traceImage", traceImage.getResource());
		builder.part("userId", 1L);

		Mono<AddFriendsAnimalResDto> result = imageWebClient
			.post()
			.uri("/comm/myAnimal")
			.contentType(MediaType.MULTIPART_FORM_DATA)
			.body(BodyInserters.fromMultipartData(builder.build()))
			.retrieve()
			.bodyToMono(AddFriendsAnimalResDto.class)
			.doOnSuccess(response -> {
				log.info("Image uploaded successfully!");
			})
			.doOnError(error -> {
				log.error("Failed to upload image: {}");
			});

		AddFriendsAnimalResDto response = result.block();
		// image 서비스와 통신 마무리
		*/

		AnimalType animalType = animalTypeRepository.findById(addFriendsAnimalReqDto.getAnimalTypeId())
			.orElseThrow(() -> new IllegalArgumentException("해당 동물 종류가 없습니다."));

		//todo: userEmail 꺼내기
		FriendsAnimal friendsAnimal = FriendsAnimal.builder()
			.animalType(animalType)
			.userEmail("tempEmail")
			.title(addFriendsAnimalReqDto.getTitle())
			.detail(addFriendsAnimalReqDto.getDetail())
			.movable(addFriendsAnimalReqDto.getMovable())
			.urlOriginal(addFriendsAnimalReqDto.getOriginalUrl())
			.urlTrace(addFriendsAnimalReqDto.getTraceUrl())
			.build();

		return friendsAnimalRepository.save(friendsAnimal).getId();
	}

}
