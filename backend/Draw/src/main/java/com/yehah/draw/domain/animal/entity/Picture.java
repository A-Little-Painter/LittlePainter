package com.yehah.draw.domain.animal.entity;

import com.yehah.draw.global.webSocket.entity.WebSocketType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class Picture {
    private WebSocketType type; // ANIMAL, FRIEND, TALE
    private Long id;
    private String sessionId;
}
