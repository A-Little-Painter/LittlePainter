package com.yehah.draw.global.communication;

import lombok.AllArgsConstructor;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Slf4j
@Configuration
@NoArgsConstructor
public class Similarity {

    @Value("${spring.path.similarity}")
    private String similarityUrl;

    @Autowired
    private RestTemplate restTemplate;

    // NOTE : multipart/form-data로 유사도 비교하기
    public Double callSimilarityCheck(MultiValueMap<String, Object> bodyData){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<?> httpEntity = new HttpEntity<>(bodyData, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                similarityUrl,
                HttpMethod.POST,
                httpEntity,
                String.class
        );

        return Double.parseDouble(response.getBody());
    }
}
