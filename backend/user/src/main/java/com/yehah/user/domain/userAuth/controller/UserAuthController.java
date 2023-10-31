package com.yehah.user.domain.userAuth.controller;

import com.yehah.user.domain.userAuth.dto.SignInRequestDTO;
import com.yehah.user.domain.userAuth.dto.SignUpRequestDTO;
import com.yehah.user.domain.userAuth.exception.AlreadyUsedEmailException;
import com.yehah.user.domain.userAuth.service.UserAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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


}
