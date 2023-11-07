package com.yehah.draw.domain.tale.controller;

import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yehah.draw.domain.tale.dto.response.TaleListResDto;
import com.yehah.draw.domain.tale.service.TaleService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/tales")
public class TaleController {

	private final TaleService taleService;

	@Operation(summary = "동화 전체 목록을 조회", description = "친구의 동물 전체 목록을 페이징 처리하여 리턴한다.")
	@GetMapping("")
	public ResponseEntity<Slice<TaleListResDto>> getFriendsAnimalList(@RequestParam(value = "page", defaultValue = "0") int page){
		log.debug("getFriendsAnimals() : page = {}, ", page);
		return ResponseEntity.ok(taleService.getTaleList(page));
	}

}
