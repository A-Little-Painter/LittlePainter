package com.yehah.draw.global.webSocket.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class ErrorMessage {
    private static final String message = "FAIL";
    private String text;

    @Builder
    public ErrorMessage(String text){
        this.text = text;
    }
}
