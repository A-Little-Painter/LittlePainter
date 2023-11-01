package com.yehah.draw.global.config;

import com.yehah.draw.global.webSocket.handler.AnimalHandler;
import com.yehah.draw.global.webSocket.handler.FriendHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry
                .addHandler(signalAnimalHandler(), "/draws/animals/comm-similarity")
                .setAllowedOrigins("*");

        registry
                .addHandler(signalFriendHandler(), "/draws/friends/comm-similarity")
                .setAllowedOrigins("*");
    }

    @Bean
    public AnimalHandler signalAnimalHandler(){
        return new AnimalHandler();
    }

    @Bean
    public FriendHandler signalFriendHandler(){ return new FriendHandler();}
}