package com.yehah.draw.domain.animal.controller;

import com.yehah.draw.global.Processor.SimilarCheckProcessor;
import com.yehah.draw.domain.animal.dto.request.AnimalSimilarReqDto;
import com.yehah.draw.domain.animal.dto.response.AnimalChoiceResDto;
import com.yehah.draw.domain.animal.dto.response.AnimalResDto;
import com.yehah.draw.domain.animal.service.AnimalService;
import com.yehah.draw.global.common.AnimalType;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/animals")
public class AnimalController {

    private final AnimalService animalService;

    private final SimilarCheckProcessor similarCheckProcessor;

    @Operation(summary = "전체 동물의 아이디, 종류, 원본 사진을 가져온다." , description = "ALL")
    @GetMapping
    public ResponseEntity<List<AnimalResDto>> getAnimalList(){
        return ResponseEntity.ok(animalService.getAnimalList());
    }

    @Operation(summary = "선택한 동물의 테두리 사진과 설명을 가져온다.", description = "ALL")
    @GetMapping("/{animalId}")
    public ResponseEntity<AnimalChoiceResDto> getTraceUrl(@PathVariable(name = "animalId")Long animalId){
        return ResponseEntity.ok(animalService.getAnimalChoiceData(animalId));
    }

    @Operation(summary = "친구의 유사도를 확인한다.", description = "ALL")
    @PostMapping("/similarcheck")
    public ResponseEntity<Void> animalSimilarCheck(@ModelAttribute AnimalSimilarReqDto animalSimilarReqDto) throws IOException {
        similarCheckProcessor.similarCheck(animalSimilarReqDto.getRoomId(), animalSimilarReqDto.getOriginalFile(), animalSimilarReqDto.getNewFile()
        ,0.19, AnimalType.animal);
        return ResponseEntity.ok().build();
    }
}
