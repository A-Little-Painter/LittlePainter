package com.yehah.draw.domain.friends_animal.controller;

import com.yehah.draw.global.Processor.SimilarCheckProcessor;
import com.yehah.draw.domain.animal.dto.request.AnimalSimilarReqDto;
import com.yehah.draw.domain.animal.dto.response.AnimalChoiceResDto;
import com.yehah.draw.global.common.AnimalType;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.yehah.draw.domain.friends_animal.dto.request.AddFriendsAnimalReqDto;
import com.yehah.draw.domain.friends_animal.dto.response.FriendsAnimalListResDto;
import com.yehah.draw.domain.friends_animal.service.FriendsAnimalCommService;
import com.yehah.draw.domain.friends_animal.service.FriendsAnimalService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/friends")
public class FriendsAnimalController {

	private final FriendsAnimalService friendsAnimalService;
	private final FriendsAnimalCommService friendsAnimalCommService;

	private final SimilarCheckProcessor similarCheckProcessor;


	@Operation(summary = "친구의 동물 전체 목록을 조회", description = "친구의 동물 전체 목록을 페이징 처리하여 리턴한다.")
	@GetMapping("")
	public ResponseEntity<Slice<FriendsAnimalListResDto>> getFriendsAnimalList(@RequestParam(name = "animalTypeId", defaultValue = "0") Long animalTypeId, @RequestParam(value = "page", defaultValue = "0") int page){
		log.debug("getFriendsAnimalList() : animalTypeId = {}, page = {}, ", animalTypeId, page);
		return ResponseEntity.ok(friendsAnimalService.getFriendsAnimalList(animalTypeId, page));
	}

	@Operation(summary = "내 동물 사진 업로드", description = "(USER) 나의 동물 사진을 업로드한다.")
	@PostMapping("")
	public ResponseEntity<Long> addMyAnimalImage(@RequestBody AddFriendsAnimalReqDto addFriendsAnimalReqDto){
		log.debug("addMyAnimalImage() : ");
		return ResponseEntity.ok(friendsAnimalCommService.addMyAnimalImage(addFriendsAnimalReqDto));
	}


	@Operation(summary = "선택한 친구의 동물 테두리 사진과 설명을 가져온다.", description = "ALL")
	@GetMapping("/{friendsAnimalId}")
	public ResponseEntity<AnimalChoiceResDto> getTraceUrl(@PathVariable(name = "friendsAnimalId")Long friendsAnimalId){
		return ResponseEntity.ok(friendsAnimalService.getAnimalChoiceData(friendsAnimalId));
	}

	@Operation(summary = "친구 동물의 유사도를 확인한다.", description = "ALL")
	@PostMapping("/similarcheck")
	public ResponseEntity<Void> friendsAnimalSimilarCheck(@ModelAttribute AnimalSimilarReqDto animalSimilarReqDto) throws IOException {
		similarCheckProcessor.similarCheck(animalSimilarReqDto.getRoomId(), animalSimilarReqDto.getOriginalFile(), animalSimilarReqDto.getNewFile()
				,0.19, AnimalType.friendsAnimal);
		return ResponseEntity.ok().build();
	}
}
