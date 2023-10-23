package com.yehah.draw.global.similarity;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yehah.draw.global.similarity.entity.Message;

public class Utils {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    private Utils() {
    }

    public static Message getObject(final String message) throws Exception {
        return objectMapper.readValue(message, Message.class); // json의 문자열을 객체로 변환
    }

    public static String getString(final Message message) throws Exception {
        return objectMapper.writeValueAsString(message); // 객체를 json의 문자열로 변환
    }
}