package com.yehah.draw.global.config;

import com.yehah.draw.global.similarity.Utils;
import com.yehah.draw.global.similarity.entity.Message;
import com.yehah.draw.global.similarity.entity.WebSocketState;
import com.yehah.draw.global.similarity.entity.WebSocketType;
import com.yehah.draw.global.webSocket.WebSocketDB;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Slf4j
@RequiredArgsConstructor
public class AnimalHandler extends TextWebSocketHandler {
    public WebSocketSession currentSession;
    public Message message;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception{
        currentSession = WebSocketDB.getWebSocket();

        if(currentSession != null && currentSession.isOpen()){
            message = Message.builder().type(WebSocketType.FRIEND)
                    .state(WebSocketState.TERMINATED).sessionID(currentSession.getId()).build();
            currentSession.sendMessage(new TextMessage(Utils.getString(message)));
            currentSession.close();
        }

        var sessionId = session.getId();

        message = Message.builder().type(WebSocketType.FRIEND).state(WebSocketState.CONNECTED)
                .sessionID(sessionId).build();

        WebSocketDB.setWebSocket(session);

        session.sendMessage(new TextMessage(Utils.getString(message)));
    }

    // 양방향 데이터 통신
    @Override
    protected void handleTextMessage (WebSocketSession session, TextMessage textMessage) throws Exception {
        // testMessage에 animalId를 보내준다.


//        Message message = Utils.getObject(textMessage.getPayload());
//        message.setType(WebSocketType.ANIMAL);
//        message.setState(WebSocketState.ACTIVE);
//
//        WebSocketSession receiver = sessions.get(message.getReceiver()); // 메세지를 전달할 타겟 상대방을 찾는다.
//
//        if(receiver != null && receiver.isOpen()) { // 타겟이 존재하고 연결된 상태라면, 메세지를 전송한다.
//            receiver.sendMessage(new TextMessage(Utils.getString(message)));
//        }


        log.info("HIHIHI");
    }
//
//    // 웹소켓 종료
//    @Override
//    public void afterConnectionClosed(WebSocketSession session, CloseStatus status){
//        var sessionId = session.getId();
//        sessions.remove(sessionId); // 세션 저장소에서 연결이 끊긴 사용자를 삭제한다.
//
//        final Message message = new Message();
//        message.closeConnect();
//        message.setSender(sessionId);
//
//        sessions.values().forEach(s -> { // 다른 사용자에게 연결이 끊겼다는 알림 메세지를 보내준다.
//            try{
//                s.sendMessage(new TextMessage(Utils.getString(message)));
//            }catch(Exception e){
//                // TODO : throw
//            }
//        });
//
//    }

}
