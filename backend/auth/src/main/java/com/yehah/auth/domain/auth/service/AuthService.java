package com.yehah.auth.domain.auth.service;

import com.yehah.auth.domain.auth.dto.request.SignInRequestDTO;
import com.yehah.auth.domain.auth.dto.request.SignUpRequestDTO;
import com.yehah.auth.domain.auth.dto.response.TokenResponseDTO;
import com.yehah.auth.global.redis.entity.EmailAuth;
import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Mono;
//import org.springframework.transaction.annotation.Transactional;


public interface AuthService {

    public ResponseEntity<String> checkEmail(String email);

    public void sendAuthCode(String email);

    public EmailAuth getEmailAuth(String authCode);

    public void deleteEmailAuth(String email);

    public ResponseEntity<?> signup(SignUpRequestDTO signUpRequestDTO);

    public ResponseEntity<?> signIn(SignInRequestDTO signInRequestDTO);
}
