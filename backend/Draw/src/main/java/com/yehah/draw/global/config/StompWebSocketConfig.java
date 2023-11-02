//package com.yehah.draw.global.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.messaging.simp.config.MessageBrokerRegistry;
//import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
//import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
//import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
//
//@EnableWebSocketMessageBroker
//@Configuration
//public class StompWebSocketConfig implements WebSocketMessageBrokerConfigurer {
//
//    @Value("${ws.path.draw}")
//    private String webSocketUrl; // http://k9d106.p.ssafy.io:8300/ws
//
//
//    //   http://k9d106.p.ssafy.io:8300/ws/draws/comm-similarity
//    @Override
//    public void registerStompEndpoints(StompEndpointRegistry registry){
//        registry.addEndpoint("/draws/comm-similarity")
//                .setAllowedOrigins(webSocketUrl).withSockJS();
//    }
//
//    // NOTE : pub, sub 등록
//    @Override
//    public void configureMessageBroker(MessageBrokerRegistry registry){
//        registry.setApplicationDestinationPrefixes("/pub"); // 입구
//        registry.enableSimpleBroker("/sub"); // 출구
//    }
//
//
//}