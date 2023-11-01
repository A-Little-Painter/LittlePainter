package com.yehah.user.domain.userAuth.controller;

import com.yehah.user.domain.userAuth.dto.request.RefreshTokenRequestDTO;
import com.yehah.user.domain.userAuth.dto.request.SignInRequestDTO;
import com.yehah.user.domain.userAuth.dto.request.SignUpRequestDTO;
import com.yehah.user.domain.userAuth.service.UserAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user-auth")
public class UserAuthController {
    private final UserAuthService userAuthService;

    @GetMapping("/comm/email/{email}")
    public ResponseEntity<String> checkEmail(@PathVariable String email){

        userAuthService.checkEmail(email);
        return ResponseEntity.ok("사용가능한 이메일입니다.");

    }

    @PostMapping("/comm/signup")
    public ResponseEntity<String> signup(@RequestBody SignUpRequestDTO signUpRequestDTO){
        userAuthService.signup(signUpRequestDTO);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/comm/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInRequestDTO signInRequestDTO){
        return userAuthService.signIn(signInRequestDTO.getEmail(), signInRequestDTO.getPassword());
    }

    //리프레시 토큰 재발급
    @PostMapping("/comm/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshTokenRequestDTO refreshTokenRequestDTO){
        return userAuthService.refresh(refreshTokenRequestDTO.getRefreshToken());
    }

}
