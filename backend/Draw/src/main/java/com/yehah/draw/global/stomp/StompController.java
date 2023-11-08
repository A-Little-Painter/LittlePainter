package com.yehah.draw.global.stomp;


import com.yehah.draw.global.common.AnimalType;
import com.yehah.draw.global.stomp.dto.MessageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@RequiredArgsConstructor
@Controller
public class StompController {

    private final SimpMessagingTemplate messagingTemplate;

    // roomId는 FE에서 랜덤으로 생성해서 알려주기
    @MessageMapping("/first-enter/{animalType}/{roomId}")
    public void firstEnter(@DestinationVariable("animalType") AnimalType animalType, @DestinationVariable("roomId") String roomId){
        log.info("{} 방의 연결을 시작합니다", roomId);

        messagingTemplate.convertAndSend("/sub/room/"+roomId,
                MessageResponse.builder()
                        .roomId(roomId)
                        .animalType(animalType)
                        .responseState(ResponseState.SUCCESS)
                        .message(roomId + "방의 연결을 시작합니다.").build());
    }

    @MessageMapping("/similarCheck/{animalType}/{roomId}")
    public void similarcheck(@DestinationVariable("animalType")AnimalType animalType, @DestinationVariable("roomId") String roomId){
        log.info("{} 방의 유사도 검사를 시작합니다.", roomId);

        messagingTemplate.convertAndSend("/sub/room/"+roomId,
                MessageResponse.builder()
                        .roomId(roomId)
                        .animalType(animalType)
                        .responseState(ResponseState.SUCCESS)
                        .message(roomId + "유사도 검사를 시작합니다.").build());
    }
}