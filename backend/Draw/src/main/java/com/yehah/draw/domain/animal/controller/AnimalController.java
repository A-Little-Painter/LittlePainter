package com.yehah.draw.domain.animal.controller;

import com.yehah.draw.domain.animal.dto.request.AnimalSimilarReqDto;
import com.yehah.draw.domain.animal.dto.request.AnimalUploadReqDto;
import com.yehah.draw.domain.animal.dto.response.AnimalChoiceResDto;
import com.yehah.draw.domain.animal.dto.response.AnimalResDto;
import com.yehah.draw.domain.animal.dto.response.AnimalSimilarResDto;
import com.yehah.draw.domain.animal.entity.SimilarState;
import com.yehah.draw.domain.animal.exception.SaveImageException;
import com.yehah.draw.domain.animal.exception.SimilarityCheckException;
import com.yehah.draw.domain.animal.service.AnimalService;
import com.yehah.draw.domain.child_work.service.ChildWorkService;
import com.yehah.draw.global.common.AnimalType;
import com.yehah.draw.global.communication.CommMethod;
import com.yehah.draw.global.stomp.StompService;
import com.yehah.draw.global.stomp.dto.MessageResponse;
import com.yehah.draw.global.stomp.ResponseState;
import com.yehah.draw.global.stomp.dto.SimilarMessageResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/animals")
public class AnimalController {

    @Value("${micro.path.similarityCheck}")
    private String similarityPath;

    private final AnimalService animalService;

    private final StompService stompService;

    private final CommMethod commMethod;

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
    public ResponseEntity<AnimalSimilarResDto> animalSimilarCheck(@ModelAttribute AnimalSimilarReqDto animalSimilarReqDto) throws IOException {
        MultiValueMap<String, Object> bodyData = new LinkedMultiValueMap<>();

        bodyData.add("roomId", animalSimilarReqDto.getRoomId());
        bodyData.add("originalFile", animalSimilarReqDto.getOriginalFile().getResource());
        bodyData.add("newFile", animalSimilarReqDto.getNewFile().getResource());

        String stompUrl = "/sub/room/"+animalSimilarReqDto.getRoomId();

        try{
            double value = Double.parseDouble(String.valueOf(commMethod.postMultipartMethod(bodyData, similarityPath)));
            log.info("-----유사도-----> "+value);

            // NOTE : STOMP 연결하기
            SimilarMessageResponse similarMessageResponse = SimilarMessageResponse.builder()
                    .roomId(animalSimilarReqDto.getRoomId())
                    .animalType(AnimalType.animal)
                    .similarValue(value)
                    .responseState(ResponseState.SUCCESS)
                    .message("유사도 연결에 성공하셨습니다.")
                    .build();

            if(value >= 0.19){
                // NOTE : STOMP 응답 전송하기
                stompService.AnimalSuccessRes(stompUrl, SimilarState.END, similarMessageResponse);
                return ResponseEntity.ok(AnimalSimilarResDto.builder()
                        .similarValue(value)
                        .similarState(SimilarState.END).build()); // 계속 유사도를 끝낸다.
            }else{
                // NOTE : STOMP 응답 전송하기
                stompService.AnimalSuccessRes(stompUrl, SimilarState.CONTINUE, similarMessageResponse);
                return ResponseEntity.ok(AnimalSimilarResDto.builder()
                        .similarValue(value)
                        .similarState(SimilarState.CONTINUE).build()); // 계속 유사도를 멈춘다.
            }
        }catch(Exception e){
            e.printStackTrace();
            // NOTE : STOMP 응답 전송하기
            stompService.AnimalFailRes(stompUrl, MessageResponse.builder()
                    .roomId(animalSimilarReqDto.getRoomId())
                    .animalType(AnimalType.animal)
                    .message("유사도 측정에 실패했습니다.").responseState(ResponseState.FAIL).build());

            throw new SimilarityCheckException("유사도 측정에 실패했습니다.");
        }
    }


    // /child-work/{category}로 변경함
    /*
    @Operation(summary = "이미지를 S3에 저장한다.", description = "USER")
    @PostMapping
    public ResponseEntity<Void> saveUserImage(@ModelAttribute AnimalUploadReqDto animalUploadReqDto) throws IOException {
        MultiValueMap<String, Object> bodyData = new LinkedMultiValueMap<>();

        // TODO : contextHolder에서 userId 가져오기
        bodyData.set("userId", 1L);
        bodyData.set("category", AnimalType.animal.name());
        bodyData.set("image", animalUploadReqDto.getFile().getResource());
        try{
            String urlWork = String.valueOf(commMethod.postMultipartMethod(bodyData, imagePath+"/comm/myWork"));

            // NOTE : childWork에 정보 저장하기
            childWorkService.saveChildWork(animalUploadReqDto.getAnimalId(), AnimalType.animal.name(), urlWork);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            throw new SaveImageException("이미지를 S3에 저장할 수 없습니다.");
        }
    }
    */

}
