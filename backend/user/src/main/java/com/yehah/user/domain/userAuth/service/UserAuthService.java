package com.yehah.user.domain.userAuth.service;

import com.yehah.user.domain.userAuth.dto.SignUpRequestDTO;
import org.springframework.http.ResponseEntity;

public interface UserAuthService {
    public void checkEmail(String email);

    public void signup(SignUpRequestDTO signUpRequestDTO);

    public ResponseEntity<?> signIn(String email, String password);
}