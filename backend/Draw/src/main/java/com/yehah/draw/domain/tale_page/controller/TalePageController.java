package com.yehah.draw.domain.tale_page.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yehah.draw.domain.tale_page.dto.response.TalePageResDto;
import com.yehah.draw.domain.tale_page.service.TalePageService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/tale-pages")
public class TalePageController {

	private final TalePageService talePageService;


	@Operation(summary = "동화 페이지별 애니메이션 얻기", description = "친구의 동물 전체 목록을 페이징 처리하여 리턴한다.")
	@PostMapping("/{taleId}/{pageNum}")
	public ResponseEntity<?> getTalePage(@PathVariable(name = "taleId") Long taleId, @PathVariable(name = "pageNum") Long pageNum){
		log.debug("getFriendsAnimals() : taleId = {}, pageNum = {}", taleId, pageNum);

		return ResponseEntity.ok(null);
	}

	@Operation(summary = "동화의 전체 페이지를 조회", description = "동화 그리기 시작 시, 페이지별 모든 정보를 반환한다.")
	@GetMapping("/{taleId}")
	public ResponseEntity<List<TalePageResDto>> getTalePages(@PathVariable(name = "taleId") Long taleId){
		log.debug("getTalePages() : taleId = {}, ", taleId);
		return ResponseEntity.ok(talePageService.getTalePages(taleId));
	}

}
