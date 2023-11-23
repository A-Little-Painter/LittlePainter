package com.yehah.draw;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class DrawApplication {
    public static void main(String[] args) {
        SpringApplication.run(DrawApplication.class, args);
    }
}
