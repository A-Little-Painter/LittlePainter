package com.yehah.draw.domain.child_work.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.yehah.draw.domain.child_work.dto.request.SaveChildWorkReqDto;
import com.yehah.draw.domain.child_work.service.ChildWorkService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.yehah.draw.domain.child_work.entity.ChildWork;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/child_work")
public class ChildWorkController {
    private final ChildWorkService childWorkService;

	@Operation(summary = "동물, 친구의 동물 [마이페이지] 저장하기", description = "<<수정필요>> (USER) 내가 그린 그림, gif를 마이페이지에 저장한다.")
	@PostMapping("/{category}")
	public ResponseEntity<Long> saveChildWork(@PathVariable(name = "category") String category, @RequestBody SaveChildWorkReqDto saveChildWorkReqDto) {
		log.info("saveChildWork() : category = {}, workId = {}, imageUrl = {}, gifUrl = {}", category, saveChildWorkReqDto.getWorkId(), saveChildWorkReqDto.getImageUrl(), saveChildWorkReqDto.getGifUrl());
		return ResponseEntity.status(201).body(childWorkService.saveChildWorksComm(category, saveChildWorkReqDto.getWorkId(), saveChildWorkReqDto.getImageUrl(), saveChildWorkReqDto.getGifUrl()));
	}

    //내 동물 조회
    @GetMapping("/my_animals")
    public ResponseEntity<?> getMyAnimals(){
        List<ChildWork> list = childWorkService.animalList();
        return ResponseEntity.ok(list);
    }

    //내 업로드 조회
    @GetMapping("/my_uploads")
    public ResponseEntity<?> getMyUploads(){
        List<ChildWork> list = childWorkService.uploadList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/urlGif")
    public ResponseEntity<List<String>> getGifTotalList(){
        return ResponseEntity.ok(childWorkService.getGifTotalList());
    }



}
