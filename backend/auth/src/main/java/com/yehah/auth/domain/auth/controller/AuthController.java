package com.yehah.auth.domain.auth.controller;

import com.yehah.auth.domain.auth.dto.request.*;
import com.yehah.auth.domain.auth.exception.ExpiredAuthCodeException;
import com.yehah.auth.domain.auth.exception.InvalidCodeException;
import com.yehah.auth.domain.auth.service.AuthService;
import com.yehah.auth.global.redis.entity.EmailAuth;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@Tag(name= "auth", description = "인증LESS API")
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    //이메일 중복확인  
    @Operation(summary = "이메일 중복확인", description = "AUTH")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용가능한 이메일"),
            @ApiResponse(responseCode = "509", description = "이메일 중복")
    })
    @GetMapping("/email/{email}")
    public ResponseEntity<String> checkEmail(@PathVariable String email){
        return authService.checkEmail(email);
    }

//    회원가입 이메일 코드 요청
    @Operation(summary = "회원가입 이메일 코드 요청", description = "AUTH")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이메일 코드 전송 성공"),
            @ApiResponse(responseCode = "501", description = "이메일 코드 전송 실패"),
            @ApiResponse(responseCode = "502", description = "REDIS에 이메일 코드 저장 실패")
    })
    @PostMapping("/signup-email")
    public ResponseEntity<String> sendAuthCode(@RequestBody SendAuthCodeRequestDTO sendAuthCodeRequestDTO){
        log.info("email : {}", sendAuthCodeRequestDTO.getEmail());
        authService.sendAuthCode(sendAuthCodeRequestDTO.getEmail());
        return ResponseEntity.ok().body("이메일 코드 전송 성공");
    }

    //인증 코드 확인
    @Operation(summary = "인증 코드 확인", description = "AUTH")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "인증 코드 확인 성공"),
            @ApiResponse(responseCode = "503", description = "인증 코드 만료"),
            @ApiResponse(responseCode = "504", description = "인증 코드 불일치")
    })
    @PostMapping("/auth-code")
    public ResponseEntity<?> checkAuthCode(@RequestBody CheckAuthCodeRequestDTO checkAuthCodeRequestDTO){

//        EmailAuth emailAuth = authService.getEmailAuth(checkAuthCodeRequestDTO);

        return authService.getEmailAuth(checkAuthCodeRequestDTO);
    }

    //회원가입
    @Operation(summary = "회원가입", description = "AUTH")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원가입 성공"),
            @ApiResponse(responseCode = "500", description = "회원가입 실패"),
            @ApiResponse(responseCode = "511", description = "DB 저장 실패"),
            @ApiResponse(responseCode = "512", description = "아이콘 찾을 수 없음")
    })
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDTO signUpRequestDTO){

        return authService.signup(signUpRequestDTO);
    }

    //로그인
    @Operation(summary = "로그인", description = "AUTH")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그인 성공"),
            @ApiResponse(responseCode = "500", description = "로그인 실패"),
            @ApiResponse(responseCode = "510", description = "로그인 정보 불일치"),
            @ApiResponse(responseCode = "511", description = "DB 저장 실패")
    })
    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInRequestDTO signInRequestDTO){

        return authService.signIn(signInRequestDTO);
    }

    //토큰 재발급
    @Operation(summary = "토큰 재발급", description = "AUTH")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "토큰 재발급 성공"),
            @ApiResponse(responseCode = "500", description = "토큰 재발급 실패"),
            @ApiResponse(responseCode = "510", description = "토큰 재발급 실패")
    })
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshTokenRequestDTO refreshTokenRequestDTO){
        return authService.refresh(refreshTokenRequestDTO);
    }

    @PatchMapping("/password")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordRequestDTO updatePasswordRequestDTO){
        return authService.updatePassword(updatePasswordRequestDTO);
    }

}
