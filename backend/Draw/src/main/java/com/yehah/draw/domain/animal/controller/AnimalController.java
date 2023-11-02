package com.yehah.draw.domain.animal.controller;

import com.yehah.draw.domain.animal.dto.request.AnimalSimilarReqDto;
import com.yehah.draw.domain.animal.dto.request.AnimalUploadReqDto;
import com.yehah.draw.domain.animal.dto.response.AnimalResDto;
import com.yehah.draw.domain.animal.dto.response.AnimalSimilarResDto;
import com.yehah.draw.domain.animal.entity.SimilarState;
import com.yehah.draw.domain.animal.exception.SimilarityCheckException;
import com.yehah.draw.domain.animal.service.AnimalService;
import com.yehah.draw.domain.category.service.CategoryService;
import com.yehah.draw.domain.child_work.service.ChildWorkService;
import com.yehah.draw.global.common.AnimalType;
import com.yehah.draw.global.communication.CommMethod;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/animals")
public class AnimalController {

    @Value("${micro.path.similarityCheck}")
    private String similarityUrl;

    @Value("${micro.path.image}")
    private String imageUrl;

    private final AnimalService animalService;

    private final ChildWorkService childWorkService;

    private final CommMethod commMethod;

    @Operation(summary = "전체 동물의 아이디, 종류, 원본 사진을 가져온다." , description = "ALL")
    @GetMapping
    public ResponseEntity<List<AnimalResDto>> getAnimalList(){
        return ResponseEntity.ok(animalService.getAnimalList());
    }

    @Operation(summary = "선택한 동물의 테두리 사진을 가져온다.", description = "ALL")
    @GetMapping("/{animalId}")
    public ResponseEntity<String> getTraceUrl(@PathVariable(name = "animalId")Long animalId){
        return ResponseEntity.ok(animalService.getAnimalTraceUrl(animalId));
    }

    @Operation(summary = "친구의 유사도를 확인한다.", description = "ALL")
    @PostMapping("/similarcheck")
    public ResponseEntity<AnimalSimilarResDto> animalSimilarCheck(@ModelAttribute AnimalSimilarReqDto animalSimilarReqDto) throws IOException {
        MultiValueMap<String, Object> bodyData = new LinkedMultiValueMap<>();

        bodyData.add("sessionId", animalSimilarReqDto.getSessionId()); // 세션 아이디 전송
        bodyData.add("originalFile", animalSimilarReqDto.getOriginalFile().getResource());
        bodyData.add("newFile", animalSimilarReqDto.getNewFile().getResource());

        log.info("sessionId : "+animalSimilarReqDto.getSessionId());

        try{
            double value = Double.parseDouble(commMethod.postMultipartMethod(bodyData, similarityUrl));
            log.info("유사도 : "+value);
            if(value <= 0.09){
                return ResponseEntity.ok(AnimalSimilarResDto.builder()
                        .similarValue(value)
                        .similarState(SimilarState.END).build()); // 계속 유사도를 끝낸다.
            }else{
                return ResponseEntity.ok(AnimalSimilarResDto.builder()
                        .similarValue(value)
                        .similarState(SimilarState.CONTINUE).build()); // 계속 유사도를 멈춘다.
            }
        }catch(Exception e){
            e.printStackTrace();
            throw new SimilarityCheckException("유사도 측정에 실패했습니다.");
        }
    }


    // TODO : 내가 그린 이미지 S3에 저장하기
    @PostMapping
    public ResponseEntity<Void> saveUserImage(@ModelAttribute AnimalUploadReqDto animalUploadReqDto) throws IOException {
        MultiValueMap<String, Object> bodyData = new LinkedMultiValueMap<>();

        // TODO : contextHolder에서 userId 가져오기
        bodyData.set("userId", 1L);
        bodyData.set("category", AnimalType.animal.name());
        bodyData.set("image", animalUploadReqDto.getFile().getResource());
        try{
            String urlWork = commMethod.postMultipartMethod(bodyData, imageUrl+"/comm/myWork");

            // NOTE : childWork에 정보 저장하기
            childWorkService.saveChildWork(animalUploadReqDto.getAnimalId(), AnimalType.animal.name(), urlWork);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.status(404).build();
        }
    }


}
