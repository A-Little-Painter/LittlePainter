package com.yehah.auth.domain.auth.service;

import com.yehah.auth.domain.auth.dto.request.*;
import com.yehah.auth.domain.auth.dto.response.TokenResponseDTO;
import com.yehah.auth.global.redis.entity.EmailAuth;
import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Mono;


public interface AuthService {

    public ResponseEntity<String> checkEmail(String email);

    public void sendAuthCode(String email);

    public ResponseEntity<?> getEmailAuth(CheckAuthCodeRequestDTO checkAuthCodeRequestDTO);


    public ResponseEntity<?> signup(SignUpRequestDTO signUpRequestDTO);

    public ResponseEntity<?> signIn(SignInRequestDTO signInRequestDTO);

    public ResponseEntity<?> refresh(RefreshTokenRequestDTO refreshTokenRequestDTO);

    public ResponseEntity<?> updatePassword(UpdatePasswordRequestDTO updatePasswordRequestDTO);
}
