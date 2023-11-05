package com.yehah.draw.global.communication;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class CommMethod {

    private final RestTemplate restTemplate;

    // NOTE : multipart/form-data로 유사도 비교하기
    public String postMultipartMethod(MultiValueMap<String, Object> bodyData, String url){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<?> httpEntity = new HttpEntity<>(bodyData, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                httpEntity,
                String.class
        );
        return response.getBody();
    }



    // NOTE : multipart/form-data로 유사도 비교하기
    public String postMultipartTestMethod(MultiValueMap<String, Object> bodyData, String url){
        log.info(url);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

//        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
//        factory.setConnectTimeout(10000);
//
//        //Connection pool set
//        HttpClient httpClient = HttpClientBuilder.create()
//                .setMaxConnTotal(100)
//                .setMaxConnPerRoute(10)
//                .evictIdleConnections(60L, TimeUnit.SECONDS) // Connection error 방지
//
//                .evictExpiredConnections()
//                .build();



        HttpEntity<?> httpEntity = new HttpEntity<>(bodyData, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                httpEntity,
                String.class
        );
        return response.getBody();
    }
}
