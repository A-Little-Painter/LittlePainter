package com.yehah.draw.global.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Slf4j
@EnableWebSocketMessageBroker
@Configuration
public class StompConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${ws.path.draw}")
    private String webSocketUrl; // http://k9d106.p.ssafy.io:8300


    //   http://k9d106.p.ssafy.io:8300/draws/comm-similarity
    //   http://localhost:8300/draws/comm-similarity
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        log.info(webSocketUrl);
        registry.addEndpoint("/ws")
                .setAllowedOrigins("*").withSockJS();
    }


    // NOTE : pub, sub 등록
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry){
        registry.setApplicationDestinationPrefixes("/pub"); // 입구 app
        registry.enableSimpleBroker("/sub"); // 출구 sub
    }


}