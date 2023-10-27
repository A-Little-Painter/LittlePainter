package com.yehah.auth.domain.auth.service;

import com.yehah.auth.global.redis.entity.EmailAuth;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;


public interface AuthService {

    public ResponseEntity<String> checkEmail(String email);

    public void sendAuthCode(String email);

    public EmailAuth getEmailAuth(String authCode);

    public void deleteEmailAuth(String email);
}
