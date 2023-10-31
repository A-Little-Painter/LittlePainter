package com.yehah.draw.domain.friends_animal.controller;

import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yehah.draw.domain.friends_animal.dto.response.FriendsAnimalListResponse;
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

	@Operation(summary = "친구의 동물 전체 목록을 조회", description = "친구의 동물 전체 목록을 페이징 처리하여 리턴한다.")
	@GetMapping("")
	public ResponseEntity<Slice<FriendsAnimalListResponse>> getFriendsAnimals(@RequestParam(name = "animalType", required = false) String animalTypeName, @RequestParam(value = "page", defaultValue = "0") int page){
		log.debug("getFriendsAnimals() : animalTypeName = {}, page = {}, ", animalTypeName, page);
		return ResponseEntity.ok(friendsAnimalService.getFriendsAnimals(animalTypeName, page));
	}
}
