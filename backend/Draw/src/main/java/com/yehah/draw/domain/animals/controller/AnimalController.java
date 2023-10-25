package com.yehah.draw.domain.animals.controller;

import com.yehah.draw.domain.animals.dto.FileUploader;
import com.yehah.draw.domain.animals.entity.Picture;
import com.yehah.draw.global.webSocket.entity.WebSocketType;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api/v1/draws/animals")
@RequiredArgsConstructor
public class AnimalController {

    private final FileUploader fileUploader;

    @Operation(summary = "동물의 유사도를 확인한다.", description = "ALL")
    @PostMapping("/conn-similarity")
    public void animalSimilarCheck(@RequestParam String sessionId,@RequestPart MultipartFile originalFile
            , @RequestPart MultipartFile newFile) throws IOException, ParseException {
        fileUploader.uploadFile(sessionId, originalFile, newFile); // NOTE : 기존의 이미지와 새로운 이미지를 받아온다.

        // TODO : 이미지의 유사도를 확인한다.


    }
}
