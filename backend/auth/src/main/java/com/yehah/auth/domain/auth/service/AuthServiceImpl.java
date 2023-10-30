package com.yehah.auth.domain.auth.service;

import com.yehah.auth.domain.auth.dto.request.SignInRequestDTO;
import com.yehah.auth.domain.auth.dto.request.SignUpRequestDTO;
import com.yehah.auth.domain.auth.dto.response.TokenResponseDTO;
import com.yehah.auth.domain.auth.exception.SignInException;
import com.yehah.auth.global.email.EmailService;
import com.yehah.auth.global.redis.entity.EmailAuth;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    @Value("${spring.path.user_service_url}")
    private String user_service_url;

    private final RestTemplate restTemplate;
    private final EmailService emailService;


    //이메일 중복 확인
    public ResponseEntity<String> checkEmail(String email){
        //user-service에 이메일을 보내서 중복인지 확인해야함
        String path=user_service_url+"/comm/email/"+email;

        ResponseEntity<String> response = restTemplate.getForEntity(path, String.class);

        return response;
    }

    //이메일 인증코드 전송
    public void sendAuthCode(String email){
        Random random = new Random();
        // 1111 ~ 9999의 랜덤한 숫자
        String authCode = String.valueOf(random.nextInt(8888) + 1111);

        emailService.sendAuthCode(email, authCode);

    }

    public EmailAuth getEmailAuth(String authCode){
        return emailService.getEmailAuth(authCode);
    }

    public void deleteEmailAuth(String email){
        emailService.deletEmailAuth(email);
    }

    //회원가입
    public ResponseEntity<Void> signup(SignUpRequestDTO signUpRequestDTO){
        String path=user_service_url+"/comm/signup";
        ResponseEntity<Void> response = restTemplate.postForEntity(path, signUpRequestDTO, Void.class);

        return response;
    }

    //로그인
    public ResponseEntity<?> signIn(SignInRequestDTO signInRequestDTO){
        String path = user_service_url + "/comm/signin";

        try {
            ResponseEntity<?> response = restTemplate.postForEntity(path, signInRequestDTO, TokenResponseDTO.class);
            return response;
        } catch (HttpClientErrorException.BadRequest ex) {
            throw new SignInException("아이디 혹은 비밀번호를 확인해 주세요.");
        }
    }
}