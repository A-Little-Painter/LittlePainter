package com.yehah.draw.global.Processor;

import com.yehah.draw.domain.animal.entity.SimilarState;
import com.yehah.draw.global.common.AnimalType;
import com.yehah.draw.global.stomp.ResponseState;
import com.yehah.draw.global.stomp.StompService;
import com.yehah.draw.global.stomp.dto.MessageResponse;
import com.yehah.draw.global.stomp.dto.SimilarMessageResponse;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class SimilarCheckProcessor {

    @Value("${micro.path.similarityCheck}")
    private String similarityPath;

    private final CommunicationProcessor communicationProcessor;

    private final StompService stompService;
    private MultiValueMap<String, Object> bodyData;

    @PostConstruct
    public void initialize(){
        bodyData = new LinkedMultiValueMap<>();
    }

    public void similarCheck(String roomId, MultipartFile originalFile, MultipartFile newFile
            ,double comparisonValue, AnimalType animalType){

        bodyData.add("roomId", roomId);
        bodyData.add("originalFile", originalFile.getResource());
        bodyData.add("newFile", newFile.getResource());

        String stompUrl = "/sub/room/"+roomId;

        try{
            double value = Double.parseDouble(String.valueOf(communicationProcessor.postMultipartMethod(bodyData, similarityPath+"/similarcheck", String.class)));
            log.info("-----유사도-----> {}", value);

            // NOTE : STOMP 연결하기
            SimilarMessageResponse similarMessageResponse = SimilarMessageResponse.builder()
                    .roomId(roomId)
                    .animalType(animalType)
                    .similarValue(value)
                    .responseState(ResponseState.SUCCESS)
                    .message("유사도 연결에 성공하셨습니다.")
                    .build();

            if(value >= comparisonValue){
                // NOTE : STOMP 응답 전송하기
                stompService.stompSuccessRes(stompUrl, SimilarState.END, similarMessageResponse);
            }else{
                // NOTE : STOMP 응답 전송하기
                stompService.stompSuccessRes(stompUrl, SimilarState.CONTINUE, similarMessageResponse);
            }
        }catch(Exception e){
            e.printStackTrace();
            // NOTE : STOMP 응답 전송하기
            stompService.stompFailRes(stompUrl, MessageResponse.builder()
                    .roomId(roomId)
                    .animalType(animalType)
                    .message("유사도 측정에 실패했습니다.").responseState(ResponseState.FAIL).build());
        }

    }
}
