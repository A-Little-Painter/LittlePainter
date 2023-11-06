package com.yehah.draw.domain.child_work_tale.controller;

import com.yehah.draw.domain.child_work_tale.service.ChildWorkTaleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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

}
