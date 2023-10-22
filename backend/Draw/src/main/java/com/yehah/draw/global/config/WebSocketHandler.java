package com.yehah.draw.global.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception{
        // var은 지역변수에서만 사용한다, 자료형을 직접 명시하지 않고 컴파일러가 자동으로 추론
        var sessionId = session.getId();
        sessions.put(sessionId, session);

        Message message = Message.builder().sender(sessionId).receiver("all").build();
        message.newConnect();

        sessions.values().forEach(s -> {
            try{
                if(!s.getId().equals(sessionId)){ // sessionId가 들어온 사실을 모두에게 알린다.
                    s.sendMessage(new TextMessage(Utils.getString(message)));
                }
            }catch(Exception e){
                // TODO : throw
            }
        });
    }

    @Override
    protected void handleTextMessage (WebSocketSession session, TextMessage textMessage) throws Exception {
        System.out.println(textMessage.getPayload().toString());
        Message message = Utils.getObject(textMessage.getPayload());
        message.setSender(session.getId());

        WebSocketSession receiver = sessions.get(message.getReceiver()); // 메세지를 전달할 타겟 상대방을 찾는다.

        if(receiver != null && receiver.isOpen()) { // 타겟이 존재하고 연결된 상태라면, 메세지를 전송한다.
            receiver.sendMessage(new TextMessage(Utils.getString(message)));
        }
    }

}
