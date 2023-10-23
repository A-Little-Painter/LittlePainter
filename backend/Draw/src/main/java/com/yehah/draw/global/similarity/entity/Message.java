package com.yehah.draw.global.similarity.entity;

import com.yehah.draw.global.similarity.entity.WebSocketState;
import com.yehah.draw.global.similarity.entity.WebSocketType;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    private WebSocketType type; // ANIMAL, FRIEND, TALE
    private WebSocketState state; // CONNECTED, ACTIVE, TERMINATED
    private String sessionID; // sessionID



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
