package com.yehah.draw.domain.child_work.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.yehah.draw.domain.child_work.service.ChildWorkService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/child-work")
public class ChildWorkController {

	private final ChildWorkService childWorkService;

	@Operation(summary = "그림, gif 저장하기", description = "내가 그린 그림을 마이페이지에 저장한다.")
	@PostMapping("/{category}")
	public ResponseEntity<?> saveChildWork(@PathVariable(name = "category") String category, @RequestPart(name = "imageFile")MultipartFile imageFile, @RequestPart(name = "gifFile")MultipartFile gifFile, @RequestPart(name = "workId") Long workId) {
		log.info("saveChildWork() : category = {}, workId = {}", category, workId);
		childWorkService.saveChildWorksComm(category, workId, imageFile, gifFile);
		return ResponseEntity.status(201).body(null);
	}
}
