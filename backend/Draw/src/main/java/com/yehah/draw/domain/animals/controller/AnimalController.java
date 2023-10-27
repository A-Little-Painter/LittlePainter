package com.yehah.draw.domain.animals.controller;

import com.yehah.draw.domain.animals.dto.FileUploader;
import com.yehah.draw.domain.animals.entity.Picture;
import com.yehah.draw.domain.animals.exception.SimilarityCheckException;
import com.yehah.draw.global.communication.Similarity;
import com.yehah.draw.global.webSocket.entity.WebSocketType;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/animals")
public class AnimalController {

    private final Similarity similarity;

    @Operation(summary = "동물의 유사도를 확인한다.", description = "ALL")
    @PostMapping("/similarcheck")
    public ResponseEntity<String> animalSimilarCheck(@RequestParam String sessionId, @RequestPart MultipartFile originalFile
            , @RequestPart MultipartFile newFile) throws IOException {

        // NOTE : 이미지의 유사도를 확인한다.
        MultiValueMap<String, Object> bodyData = new LinkedMultiValueMap<>();

        bodyData.add("sessionId", sessionId); // 세션 아이디 전송
        ByteArrayResource originalFileResource = new ByteArrayResource(originalFile.getBytes()) {
            @Override
            public String getFilename() {
                return "originalFile.jpg";
            }
        };
        bodyData.add("originalFile", originalFileResource); // 기본 이미지 바이트로 변경함

        ByteArrayResource newFileResource = new ByteArrayResource(newFile.getBytes()) {
            @Override
            public String getFilename() {
                return "newFile.jpg";
            }
        };
        bodyData.add("newFile", newFileResource); // 새로운 이미지 바이트로 변경함

        try{
            double result = similarity.postSimilarityCheck(bodyData); // SimilarCheck에 전송, 결과 받기
            if(result <= 0.8){
                return ResponseEntity.ok("END"); // 계속 유사도를 진행한다.
            }else{
                return ResponseEntity.ok("CONTINUE"); // 유사도 측정을 끝낸다.
            }
        }catch(Exception e){
            throw new SimilarityCheckException("유사도 측정에 실패했습니다.");
        }
    }
}
