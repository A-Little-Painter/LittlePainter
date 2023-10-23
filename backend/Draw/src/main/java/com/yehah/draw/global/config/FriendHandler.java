package com.yehah.draw.global.config;

import com.yehah.draw.global.webSocket.Utils;
import com.yehah.draw.global.webSocket.entity.Message;
import com.yehah.draw.global.webSocket.entity.WebSocketState;
import com.yehah.draw.global.webSocket.entity.WebSocketType;
import com.yehah.draw.global.webSocket.WebSocketDB;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Slf4j
@RequiredArgsConstructor
public class FriendHandler extends TextWebSocketHandler {

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
}
