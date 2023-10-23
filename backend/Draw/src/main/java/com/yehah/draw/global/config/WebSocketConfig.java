package com.yehah.draw.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry
                .addHandler(signalAnimalHandler(), "/draws/animals/conn-similarity")
                .setAllowedOrigins("*");

        registry
                .addHandler(signalFriendHandler(), "/draws/friends/conn-similarity")
                .setAllowedOrigins("*");
    }

    @Bean
    public AnimalHandler signalAnimalHandler(){
        return new AnimalHandler();
    }

    @Bean
    public FriendHandler signalFriendHandler(){ return new FriendHandler();}
}
