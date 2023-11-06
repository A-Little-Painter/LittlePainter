package com.yehah.draw.domain.child_work.controller;

import com.yehah.draw.domain.child_work.dto.AnimalChildWorkResponseDTO;
import com.yehah.draw.domain.child_work.entity.ChildWork;
import com.yehah.draw.domain.child_work.service.ChildWorkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/child_work")
public class ChildWorkController {
    private final ChildWorkService childWorkService;

    //내 동화 조회
//    @GetMapping("/my_tales")
//    public ResponseEntity<?> getMyTales(){
//
//    }

//    //내 동물 조회
//    @GetMapping("/my_animals")
//    public ResponseEntity<?> getMyAnimals(){
//        List<ChildWork> list = childWorkService.animalList();
//        return ResponseEntity.ok(list);
//    }
//
//    //내 업로드 조회
//    @GetMapping("/my_uploads")
//    public ResponseEntity<?> getMyUploads(){
//        List<ChildWork> list = childWorkService.uploadList();
//        return ResponseEntity.ok(list);
//    }
}
