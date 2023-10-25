package com.yehah.draw.domain.animals.controller;

import com.yehah.draw.domain.animals.dto.FileUploader;
import com.yehah.draw.domain.animals.entity.Picture;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/draws/animals")
public class AnimalController {


    private FileUploader fileUploader;

    @GetMapping
    public void socketTest(){
        log.info("hihi~~");
        return;
    }

    @Operation(summary = "동물의 유사도를 확인한다.", description = "ALL")
    @PostMapping("/conn-similarity")
    public void animalSimilarCheck(@RequestBody Picture picture) throws IOException {
        fileUploader.uploadFile(picture);
        return;
    }
}
