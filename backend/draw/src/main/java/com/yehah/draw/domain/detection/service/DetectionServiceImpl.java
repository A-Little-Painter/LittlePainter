package com.yehah.draw.domain.detection.service;

import com.yehah.draw.domain.detection.dto.response.AnimalDetectionResponseDTO;
import com.yehah.draw.domain.detection.utils.GoogleTranslateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class DetectionServiceImpl implements DetectionService {
    @Value("${micro.path.detection}")
    private String detection_service_url;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;

    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;

    private final WebClient webClient;

    private final GoogleTranslateService googleTranslateService;

    // //이미지 업로드
    // public ResponseEntity<?> uploadAnimals(MultipartFile file) throws IOException {
    //     String path = detection_service_url + "/comm/detect";

    //     try {
    //         // 파일을 멀티파트 폼 데이터로 전송
    //         MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
    //         body.add("file", new ByteArrayResource(file.getBytes()) {
    //             @Override
    //             public String getFilename() {
    //                 return file.getOriginalFilename();
    //             }
    //         });
    //         //TODO : DETECTION 서버 누끼따기 에러 고치고 FLASK CONFIG 서버 알아보기
    //         body.add("S3_BUCKET", bucket);
    //         body.add("S3_KEY", accessKey);
    //         body.add("S3_SECRET", secretKey);
    //         body.add("S3_REGION", region);

    //         ResponseEntity<AnimalDetectionResponseDTO> response = webClient.post()
    //                 .uri(path)
    //                 .contentType(MediaType.MULTIPART_FORM_DATA)
    //                 .body(BodyInserters.fromMultipartData(body))
    //                 .retrieve()
    //                 .toEntity(AnimalDetectionResponseDTO.class)
    //                 .block();

    //         AnimalDetectionResponseDTO animalDetectionResponseDTO = response.getBody();

    //         String translatedAnimalType = googleTranslateService.translateToKorean(animalDetectionResponseDTO.getAnimal_type());
    //         // 번역된 값을 DTO에 설정
    //         animalDetectionResponseDTO.setAnimal_type(translatedAnimalType);

    //         return ResponseEntity.status(response.getStatusCode()).body(animalDetectionResponseDTO);
    //     } catch (Exception e) {
    //         throw e;
    //     }
    // }
    
    public Mono<ResponseEntity<?>> uploadAnimals(MultipartFile file) {
        String path = detection_service_url + "/comm/detect";
    
        // 파일을 멀티파트 폼 데이터로 전송
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        });
        body.add("S3_BUCKET", bucket);
        body.add("S3_KEY", accessKey);
        body.add("S3_SECRET", secretKey);
        body.add("S3_REGION", region);
    
        return webClient.post()
                .uri(path)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(body))
                .retrieve()
                .toEntity(AnimalDetectionResponseDTO.class)
                .flatMap(response -> {
                    AnimalDetectionResponseDTO animalDetectionResponseDTO = response.getBody();
    
    
                    return Mono.just(animalDetectionResponseDTO)
                            .flatMap(dto -> googleTranslateService.translateToKoreanAsync(dto.getAnimal_type()))
                            .map(translatedAnimalType -> {
                                animalDetectionResponseDTO.setAnimal_type(translatedAnimalType);
                                return ResponseEntity.status(response.getStatusCode()).body(animalDetectionResponseDTO);
                            });
                })
                .onErrorResume(e -> Mono.just(ResponseEntity.internalServerError().body("Error processing the request: " + e.getMessage())));
    }
}
