package com.yehah.draw.domain.tale.controller;

import com.yehah.draw.global.Processor.SimilarCheckProcessor;
import com.yehah.draw.domain.tale.dto.request.TaleSimilarReqDto;
import com.yehah.draw.global.common.AnimalType;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.yehah.draw.domain.tale.dto.response.TaleListResDto;
import com.yehah.draw.domain.tale.service.TaleService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/tales")
public class TaleController {

	private final TaleService taleService;

	private final SimilarCheckProcessor similarCheckProcessor;

	@Operation(summary = "동화 전체 목록을 조회", description = "동화 전체 목록을 페이징 처리하여 리턴한다.")
	@GetMapping("")
	public ResponseEntity<Slice<TaleListResDto>> getFriendsAnimalList(@RequestParam(value = "page", defaultValue = "0") int page){
		log.debug("getFriendsAnimals() : page = {}, ", page);
		return ResponseEntity.ok(taleService.getTaleList(page));
	}

	@Operation(summary = "동화의 유사도를 확인한다.", description = "ALL")
	@PostMapping("/similarcheck")
	public ResponseEntity<Void> taleSimilarCheck(@ModelAttribute TaleSimilarReqDto taleSimilarReqDto) throws IOException {
		similarCheckProcessor.similarCheck(taleSimilarReqDto.getRoomId(), taleSimilarReqDto.getOriginalFile(), taleSimilarReqDto.getNewFile()
				,0.19, AnimalType.tale);
		return ResponseEntity.ok().build();
	}
}
