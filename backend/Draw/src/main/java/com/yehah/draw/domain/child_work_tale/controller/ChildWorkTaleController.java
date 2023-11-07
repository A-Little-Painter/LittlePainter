package com.yehah.draw.domain.child_work_tale.controller;

import com.yehah.draw.domain.child_work_tale.dto.request.AddChildWorkTaleFormReqDto;
import com.yehah.draw.domain.child_work_tale.service.ChildWorkTaleService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/child_work_tale")
public class ChildWorkTaleController {
    private final ChildWorkTaleService childWorkTaleService;

    //내 동화 조회
    @GetMapping("/my_tales")
    public ResponseEntity<?> getMyTales(){
        return ResponseEntity.ok(childWorkTaleService.getMyTales());
    }

    @Operation(summary = "동화 그리기 마이페이지 저장", description = "(USER) 내가 그린 동화 그림을 마이페이지에 저장한다.")
    @PostMapping("/{taleId}")
        public ResponseEntity<Void> saveChildWorkTale(@PathVariable Long taleId, @ModelAttribute AddChildWorkTaleFormReqDto request) {
        log.info("saveChildWorkTale() : taleId = {}", taleId);
        // request.getAddChildWorkTaleReqDtoList().stream()
        //     .forEach(memberRequest -> {
        //         System.out.println(memberRequest.getPageId());
        //         System.out.println(memberRequest.getGifUrl());
        //         System.out.println(memberRequest.getImageFile().getOriginalFilename());
        //     });

        childWorkTaleService.saveChildWorkTale(taleId, request.getAddChildWorkTaleReqDtoList());
        return ResponseEntity.ok().build();
    }


//    //내 동화 상세 조회
    //tale 아이디를 가져와야하나? 흠
//    @GetMapping("/my_tales/{taleId}")
//    public ResponseEntity<?> getMyTaleDetail(@PathVariable Long taleId){
//        return ResponseEntity.ok(childWorkTaleService.getMyTaleDetail(taleId));
//    }

}
