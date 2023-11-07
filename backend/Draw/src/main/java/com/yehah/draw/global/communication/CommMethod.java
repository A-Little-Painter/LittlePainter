package com.yehah.draw.global.communication;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class CommMethod {

    private final RestTemplate restTemplate;

    // NOTE : multipart/form-data로 유사도 비교하기
    public Object postMultipartMethod(MultiValueMap<String, Object> bodyData, String url){
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
    public MultipartFile postMultipartAnimateMethod(MultiValueMap<String, Object> bodyData, String url) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<?> httpEntity = new HttpEntity<>(bodyData, headers);

        ResponseEntity<MultipartFile> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                httpEntity,
                MultipartFile.class
        );

//        log.info("DATA :"+ response.getBody());
//
//        Resource resource = new ByteArrayResource(response.getBody().getBytes());
//
//        return resource;


        return response.getBody();
    }
}
