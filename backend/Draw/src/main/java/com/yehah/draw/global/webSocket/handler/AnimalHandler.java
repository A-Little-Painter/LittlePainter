package com.yehah.draw.global.webSocket.handler;

import com.yehah.draw.global.webSocket.Utils;
import com.yehah.draw.global.webSocket.entity.response.ErrorMessage;
import com.yehah.draw.global.webSocket.entity.response.SuccessMessage;
import com.yehah.draw.global.webSocket.entity.response.WebSocketState;
import com.yehah.draw.global.common.AnimalType;
import com.yehah.draw.global.webSocket.WebSocketDB;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Slf4j
@RequiredArgsConstructor
public class AnimalHandler extends TextWebSocketHandler {
    public WebSocketSession currentSession;
    public SuccessMessage successMessage;
    public ErrorMessage errorMessage;

    // NOTE : 처음 웹소켓을 연결하는 경우
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception{
        currentSession = WebSocketDB.getWebSocket();
        log.info("처음 웹소켓을 연결하는 경우");
        if(currentSession != null && currentSession.isOpen()){ // 처음 연결했을 때 세션이 진행중이라면 세션을 끊는다.
            errorMessage = ErrorMessage.builder().text("실행중인 세션을 종료하겠습니다.").build();
            currentSession.sendMessage(new TextMessage(Utils.getString(errorMessage)));
            currentSession.close();
        }

        var sessionId = session.getId();

        successMessage = SuccessMessage.builder().type(AnimalType.animal).state(WebSocketState.CONNECTED)
                .sessionId(sessionId).build();

        WebSocketDB.setWebSocket(session); // 세션을 연결한다.

        session.sendMessage(new TextMessage(Utils.getString(successMessage)));
    }

    // NOTE : 양방향 통신을 진행하고 있다.
    @Override
    protected void handleTextMessage (WebSocketSession session, TextMessage textMessage) throws Exception {
        currentSession = WebSocketDB.getWebSocket();
        log.info("양방향 통신을 진행하고 있다.");
        if(session.getId().equals(currentSession.getId())){ // 현재 진행중인 세션과 같은 세션을 호출한 경우
            successMessage = SuccessMessage.builder().sessionId(session.getId()).type(AnimalType.animal)
                    .state(WebSocketState.ACTIVE).build();
            session.sendMessage(new TextMessage(Utils.getString(successMessage)));
        }else{ // 현재 진행중인 세션과 다른 세션을 호출한 경우
            errorMessage = ErrorMessage.builder().text("현재와 다른 세션을 호출하셨습니다.").build();
            session.sendMessage(new TextMessage(Utils.getString(errorMessage)));
        }

    }

    // NOTE : 웹소켓을 종료한다.
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        currentSession = WebSocketDB.getWebSocket();
        log.info("웹소켓을 종료한다.");
        if(session.getId().equals(currentSession.getId())){
            successMessage = SuccessMessage.builder().sessionId(session.getId()).type(AnimalType.animal)
                    .state(WebSocketState.TERMINATED).build();
        }
    }

}
