package com.yehah.draw.domain.friends_animal.controller;

import org.springframework.data.domain.Slice;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.yehah.draw.domain.friends_animal.dto.request.AddFriendsAnimalReqDto;
import com.yehah.draw.domain.friends_animal.dto.response.FriendsAnimalListResDto;
import com.yehah.draw.domain.friends_animal.service.FriendsAnimalCommService;
import com.yehah.draw.domain.friends_animal.service.FriendsAnimalService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/friends")
public class FriendsAnimalController {

	private final FriendsAnimalService friendsAnimalService;
	private final FriendsAnimalCommService friendsAnimalCommService;

	@Operation(summary = "친구의 동물 전체 목록을 조회", description = "친구의 동물 전체 목록을 페이징 처리하여 리턴한다.")
	@GetMapping("")
	public ResponseEntity<Slice<FriendsAnimalListResDto>> getFriendsAnimalList(@RequestParam(name = "animalType", required = false) String animalTypeName, @RequestParam(value = "page", defaultValue = "0") int page){
		log.debug("getFriendsAnimals() : animalTypeName = {}, page = {}, ", animalTypeName, page);
		return ResponseEntity.ok(friendsAnimalService.getFriendsAnimalList(animalTypeName, page));
	}

	@Operation(summary = "내 동물 사진 업로드", description = "(최종버전)나의 동물 사진을 업로드한다.")
	@PostMapping(name = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Long> addMyAnimalImage(@RequestPart(value="originalImage") MultipartFile originalImage,
		@RequestPart(value="traceImage") MultipartFile traceImage, @RequestPart(value = "addFriendsAnimalReqDto") AddFriendsAnimalReqDto addFriendsAnimalReqDto){
		log.debug("addMyAnimalImage() : ");
		return ResponseEntity.ok(friendsAnimalCommService.addMyAnimalImage(originalImage, traceImage, addFriendsAnimalReqDto));
	}

	// @Operation(summary = "내 동물 사진 업로드", description = "(테스트 완료 버전)나의 동물 사진을 업로드한다.")
	// @PostMapping(name = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	// public ResponseEntity<Mono<AddFriendsAnimalResDto>> addMyAnimal(@RequestPart(value="originalImage") MultipartFile originalImage,
	// 	@RequestPart(value="traceImage") MultipartFile traceImage){
	// 	//, @RequestPart FriendsAnimalReqDto friendsAnimalReqDto
	// 	log.debug("addMyAnimal() : ");
	// 	return ResponseEntity.ok(friendsAnimalCommService.uploadImage(originalImage, traceImage, 1L));
	// }
}
