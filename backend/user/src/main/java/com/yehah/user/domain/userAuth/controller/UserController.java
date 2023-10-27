package com.yehah.user.domain.userAuth.controller;

import com.yehah.user.domain.userAuth.dto.SignUpRequestDTO;
import com.yehah.user.domain.userAuth.exception.AlreadyUsedEmailException;
import com.yehah.user.domain.userAuth.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user-auth")
public class UserController {
    private final UserService userService;

    @GetMapping("/comm/email/{email}")
    public ResponseEntity<String> checkEmail(@PathVariable String email){
        try {
            userService.checkEmail(email);
            return ResponseEntity.ok("사용가능한 이메일입니다.");
        } catch (AlreadyUsedEmailException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/comm/signup")
    public ResponseEntity<Void> signup(@RequestBody SignUpRequestDTO signUpRequestDTO){
        userService.signup(signUpRequestDTO);
        return ResponseEntity.ok().build();
    }
}
