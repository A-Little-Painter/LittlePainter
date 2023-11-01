package com.yehah.auth.domain.auth.service;

import com.yehah.auth.domain.auth.dto.request.CheckAuthCodeRequestDTO;
import com.yehah.auth.domain.auth.dto.request.RefreshTokenRequestDTO;
import com.yehah.auth.domain.auth.dto.request.SignInRequestDTO;
import com.yehah.auth.domain.auth.dto.request.SignUpRequestDTO;
import com.yehah.auth.domain.auth.dto.response.TokenResponseDTO;
import com.yehah.auth.global.email.EmailService;
import com.yehah.auth.global.redis.entity.EmailAuth;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    @Value("${spring.path.user_service_url}")
    private String user_service_url;

//    private final RestTemplate restTemplate;
    private final EmailService emailService;

    private final WebClient.Builder webClientBuilder;


    //이메일 중복 확인
    public ResponseEntity<String> checkEmail(String email) {
        String path = user_service_url + "/comm/email/" + email;

        WebClient webClient = webClientBuilder.build();

        try {
            return webClient.get()
                    .uri(path)
                    .retrieve()
                    .toEntity(String.class)
                    .block();
        } catch (WebClientResponseException e) {

            if (e.getStatusCode().is5xxServerError()) {
                return ResponseEntity.badRequest().body(e.getResponseBodyAsString());
            }
            throw e;
        }
    }

    //이메일 인증코드 전송
    public void sendAuthCode(String email){
        Random random = new Random();
        // 1111 ~ 9999의 랜덤한 숫자
        String authCode = String.valueOf(random.nextInt(8888) + 1111);

        emailService.sendAuthCode(email, authCode);

    }

    public ResponseEntity<?> getEmailAuth(CheckAuthCodeRequestDTO checkAuthCodeRequestDTO){
        return emailService.getEmailAuth(checkAuthCodeRequestDTO);
    }

//    public void deleteEmailAuth(String email){
//        emailService.deletEmailAuth(email);
//    }

    //회원가입
    @Transactional
    public ResponseEntity<?> signup(SignUpRequestDTO signUpRequestDTO){
        String path=user_service_url+"/comm/signup";

        WebClient webClient = webClientBuilder.build();

        try{
            return webClient.post()
                    .uri(path)
                    .bodyValue(signUpRequestDTO)
                    .retrieve()
                    .toEntity(String.class)
                    .block();
        } catch (WebClientResponseException e) {
            if (e.getStatusCode().is5xxServerError()) {
                return ResponseEntity.badRequest().body(e.getResponseBodyAsString());
            }
            throw e;
        }

    }

    //로그인
    @Transactional
    public ResponseEntity<?> signIn(SignInRequestDTO signInRequestDTO){
        String path = user_service_url + "/comm/signin";

        WebClient webClient = webClientBuilder.build();

        try{
            return webClient.post()
                    .uri(path)
                    .bodyValue(signInRequestDTO)
                    .retrieve()
                    .toEntity(TokenResponseDTO.class).block();
        }catch(WebClientResponseException e){
            if(e.getStatusCode().is5xxServerError()){
                return ResponseEntity.badRequest().body(e.getResponseBodyAsString());
            }
            throw e;
        }
    }



//    public Mono<ResponseEntity<?>> signIn(SignInRequestDTO signInRequestDTO){
//        String path = user_service_url + "/comm/signin";
//
//        WebClient webClient = webClientBuilder.build();
//
//        return webClient.post()
//                .uri(path)
//                .bodyValue(signInRequestDTO)
//                .retrieve()
//                .toEntity(TokenResponseDTO.class)
//                .onErrorResume(WebClientResponseException.class, e -> {
//                    if(e.getStatusCode().is5xxServerError()){
//                        return Mono.just(ResponseEntity.badRequest().body(e.getResponseBodyAsString()));
//                    }
//                    return Mono.error(e);
//                });
//    }

    //토큰 재발급
    public ResponseEntity<?> refresh(RefreshTokenRequestDTO refreshTokenRequestDTO) {
        String path = user_service_url + "/comm/refresh";

        WebClient webClient = webClientBuilder.build();

        try{
            return webClient.post()
                    .uri(path)
                    .bodyValue(refreshTokenRequestDTO)
                    .retrieve()
                    .toEntity(TokenResponseDTO.class).block();
        }catch(WebClientResponseException e){
            if(e.getStatusCode().is5xxServerError()){
                return ResponseEntity.badRequest().body(e.getResponseBodyAsString());
            }
            throw e;
        }
    }
}
