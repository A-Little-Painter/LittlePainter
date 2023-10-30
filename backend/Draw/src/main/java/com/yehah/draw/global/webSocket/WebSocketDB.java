package com.yehah.draw.global.webSocket;

import org.springframework.web.socket.WebSocketSession;


public class WebSocketDB {
    private static WebSocketSession currentSession;

    public static void setWebSocket(WebSocketSession currentSession){
        WebSocketDB.currentSession = currentSession;
    }

    public static WebSocketSession getWebSocket(){
        return currentSession;
    }
}
