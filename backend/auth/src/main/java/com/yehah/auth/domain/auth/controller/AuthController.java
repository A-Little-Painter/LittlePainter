package com.yehah.auth.domain.auth.controller;

import com.yehah.auth.domain.auth.dto.request.CheckAuthCodeRequestDTO;
import com.yehah.auth.domain.auth.dto.request.SendAuthCodeRequestDTO;
import com.yehah.auth.domain.auth.dto.request.SignInRequestDTO;
import com.yehah.auth.domain.auth.dto.request.SignUpRequestDTO;
import com.yehah.auth.domain.auth.exception.ExpiredAuthCodeException;
import com.yehah.auth.domain.auth.exception.InvalidCodeException;
import com.yehah.auth.domain.auth.service.AuthService;
import com.yehah.auth.global.redis.entity.EmailAuth;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    //이메일 중복확인
    @GetMapping("/email/{email}")
    public ResponseEntity<String> checkEmail(@PathVariable String email){
        return authService.checkEmail(email);
    }

//    회원가입 이메일 코드 요청
    @PostMapping("/signup-email")
    public ResponseEntity<Void> sendAuthCode(@RequestBody SendAuthCodeRequestDTO sendAuthCodeRequestDTO){
        log.info("email : {}", sendAuthCodeRequestDTO.getEmail());
        authService.sendAuthCode(sendAuthCodeRequestDTO.getEmail());
        return ResponseEntity.ok().build();
    }

    //인증 코드 확인
    @PostMapping("/auth-code")
    public ResponseEntity<Void> checkAuthCode(@RequestBody CheckAuthCodeRequestDTO checkAuthCodeRequestDTO){
        //ControllerAdvice하면 controller에서 에러 잡는게 아니라 service에서 에러잡아야하는데...
        //나중에 리팩토링 하겠음
        EmailAuth emailAuth = authService.getEmailAuth(checkAuthCodeRequestDTO.getCode());

        if(emailAuth == null){
            throw new ExpiredAuthCodeException("인증 번호가 만료되었습니다");
        }else if(emailAuth.getEmail().equals(checkAuthCodeRequestDTO.getEmail())){
            authService.deleteEmailAuth(checkAuthCodeRequestDTO.getEmail());
            return ResponseEntity.ok().build();
        }else{
            throw new InvalidCodeException("인증번호가 올바르지 않습니다.");
        }
    }

    //회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDTO signUpRequestDTO){

        return authService.signup(signUpRequestDTO);
    }

    //로그인
    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInRequestDTO signInRequestDTO){

        return authService.signIn(signInRequestDTO);
    }

}
