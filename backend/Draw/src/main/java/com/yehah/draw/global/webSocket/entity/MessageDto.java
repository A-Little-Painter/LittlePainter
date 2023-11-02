package com.yehah.draw.global.webSocket.entity;

import com.yehah.draw.global.common.AnimalType;
import com.yehah.draw.global.webSocket.entity.response.WebSocketState;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MessageDto {
    private String sessionId; // sessionId
    private AnimalType type; // ANIMAL, FRIEND, TALE
    private WebSocketState state; // CONNECTED, ACTIVE, TERMINATED

    @Builder
    public MessageDto(String sessionId, AnimalType type, WebSocketState state) {
        this.sessionId = sessionId;
        this.type = type;
        this.state = state;
    }
}
