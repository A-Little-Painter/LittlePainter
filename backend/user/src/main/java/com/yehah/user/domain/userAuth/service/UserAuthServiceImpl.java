package com.yehah.user.domain.userAuth.service;

import com.yehah.user.domain.user.repository.IconRepository;
import com.yehah.user.domain.userAuth.dto.SignUpRequestDTO;
import com.yehah.user.domain.userAuth.entity.Child;
import com.yehah.user.domain.userAuth.entity.Icon;
import com.yehah.user.domain.userAuth.entity.User;
import com.yehah.user.domain.userAuth.exception.AlreadyUsedEmailException;
import com.yehah.user.domain.userAuth.repository.UserAuthRepository;
import com.yehah.user.global.security.entity.RefreshToken;
import com.yehah.user.global.security.entity.Token;
import com.yehah.user.global.security.repository.RefreshTokenRedisRepository;
import com.yehah.user.global.security.service.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserAuthServiceImpl implements UserAuthService {
    private final UserAuthRepository userAuthRepository;
    private final IconRepository iconRepository;

    private final RefreshTokenRedisRepository refreshTokenRedisRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtProvider jwtProvider;

//    @Transactional(readOnly = true)
    public void checkEmail(String email){
        if(userAuthRepository.existsByEmail(email)){
            throw new AlreadyUsedEmailException("이미 사용중인 이메일입니다.");
        }
    }

    public void signup(SignUpRequestDTO signUpRequestDTO){
        Icon icon = iconRepository.findById(1L).orElseThrow(() -> new RuntimeException("Icon not found"));


        Child child = Child.builder()
                .nickname(signUpRequestDTO.getChildName())
                .birthday(signUpRequestDTO.getBirthday())
                .icon(icon)
                .build();

        User user = User.builder()
                .email(signUpRequestDTO.getEmail())
                .password(passwordEncoder.encode(signUpRequestDTO.getPassword()))
                .tts(true)
                .child(child)
                .build();

        userAuthRepository.save(user);
    }

    public ResponseEntity<?> signIn(String email, String password) {
        User user = userAuthRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("아이디 혹은 비밀번호를 확인해 주세요."));

        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new IllegalArgumentException("아이디 혹은 비밀번호를 확인해 주세요.");
        }

        Token token = jwtProvider.generateToken(user.getEmail(), user.getRole());

        refreshTokenRedisRepository.save(RefreshToken.builder()
                .email(user.getEmail())
                .refreshToken(token.getRefreshToken())
                .build());



        return ResponseEntity.ok().body(token);
    }
}
