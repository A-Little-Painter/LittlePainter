package com.yehah.draw.global.stomp;

import com.yehah.draw.domain.animal.entity.SimilarState;
import com.yehah.draw.global.stomp.dto.MessageResponse;
import com.yehah.draw.global.stomp.dto.SimilarMessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StompService {

    private final SimpMessagingTemplate messagingTemplate;

    // NOTE : STOMP 성공 응답 전송하기
    public void AnimalSuccessRes(String responseUrl, SimilarState similarState, SimilarMessageResponse similarMessageResponse){
        similarMessageResponse.setSimilarState(similarState);
        messagingTemplate.convertAndSend(responseUrl, similarMessageResponse);
    }

    // NOTE : STOMP 실패 응답 전송하기
    public void AnimalFailRes(String responseUrl, MessageResponse messageResponse){
        messagingTemplate.convertAndSend(responseUrl, messageResponse);
    }
}
