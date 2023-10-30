package com.yehah.draw.global.webSocket.entity.response;

import com.yehah.draw.global.webSocket.entity.WebSocketState;
import com.yehah.draw.global.webSocket.entity.WebSocketType;
import lombok.*;



@Data
@NoArgsConstructor
public class SuccessMessage {
    private static final String message = "SUCCESS";
    private String sessionId; // sessionId
    private WebSocketType type; // ANIMAL, FRIEND, TALE
    private WebSocketState state; // CONNECTED, ACTIVE, TERMINATED


    @Builder
    public SuccessMessage(String sessionId, WebSocketType type, WebSocketState state){
        this.sessionId = sessionId;
        this.type = type;
        this.state = state;
    }


//    public void setSender(String sender){this.sender = sender;}
//
//    public void newConnect(){
//        this.type = "new";
//    }
//
//    public void closeConnect(){
//        this.type = "close";
//    }
}
