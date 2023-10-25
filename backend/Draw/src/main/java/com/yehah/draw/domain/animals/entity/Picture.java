package com.yehah.draw.domain.animals.entity;

import com.yehah.draw.global.webSocket.entity.WebSocketType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class Picture {
    private WebSocketType type; // ANIMAL, FRIEND, TALE
    private Long idx;
    private String sessionId;
    private MultipartFile multipartFile;//
}
