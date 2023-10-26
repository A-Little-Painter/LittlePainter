package com.yehah.draw.global.webSocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yehah.draw.global.webSocket.entity.SuccessMessage;


public class Utils {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    private Utils() {
    }

    public static SuccessMessage getObject(String message) throws Exception {
        return objectMapper.readValue(message, SuccessMessage.class); // json의 문자열을 객체로 변환
    }

    public static String getString(Object message) throws Exception {
        return objectMapper.writeValueAsString(message); // 객체를 json의 문자열로 변환
    }



}