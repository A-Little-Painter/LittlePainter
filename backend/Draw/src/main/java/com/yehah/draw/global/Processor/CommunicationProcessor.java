package com.yehah.draw.global.Processor;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.*;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class CommunicationProcessor {

    private final RestTemplate restTemplate;

    // NOTE : multipart/form-data로 유사도 비교하기
    public <T> T postMultipartMethod(MultiValueMap<String, Object> bodyData, String url, Class<T> responseType){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<?> httpEntity = new HttpEntity<>(bodyData, headers);

        ResponseEntity<T> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                httpEntity,
                responseType
        );

        return response.getBody();
    }


    // NOTE : Animate-Service에서 gif파일 받아오기
    public byte[] postMultipartAnimateMethod(MultiValueMap<String, Object> bodyData, String url) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<?> httpEntity = new HttpEntity<>(bodyData, headers);

        ResponseEntity<byte[]> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                httpEntity,
                byte[].class
        );

        return response.getBody();
    }





}
