package com.yehah.user.domain.userAuth.service;

import com.yehah.user.domain.user.exception.DatabaseException;
import com.yehah.user.domain.user.exception.NoDataFoundException;
import com.yehah.user.domain.user.repository.ChildRepository;
import com.yehah.user.domain.user.repository.IconRepository;
import com.yehah.user.domain.userAuth.dto.request.SignUpRequestDTO;
import com.yehah.user.domain.userAuth.dto.response.SignInResponseDTO;
import com.yehah.user.domain.userAuth.entity.Child;
import com.yehah.user.domain.userAuth.entity.Icon;
import com.yehah.user.domain.userAuth.entity.User;
import com.yehah.user.domain.userAuth.enums.Role;
import com.yehah.user.domain.userAuth.exception.AlreadyUsedEmailException;
import com.yehah.user.domain.userAuth.repository.UserAuthRepository;
import com.yehah.user.global.security.entity.RefreshToken;
import com.yehah.user.global.security.entity.Token;
import com.yehah.user.global.security.repository.RefreshTokenRedisRepository;
import com.yehah.user.global.security.service.JwtProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Ref;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserAuthServiceImpl implements UserAuthService {
    private final UserAuthRepository userAuthRepository;
    private final IconRepository iconRepository;
    private final ChildRepository childRepository;

    private final RefreshTokenRedisRepository refreshTokenRedisRepository;


    private final PasswordEncoder passwordEncoder;

    private final JwtProvider jwtProvider;

    public void checkEmail(String email){
        if(userAuthRepository.existsByEmail(email)){
            throw new AlreadyUsedEmailException("이미 사용중인 이메일입니다.");
        }
    }

    @Transactional
    public void signup(SignUpRequestDTO signUpRequestDTO){
        Icon icon = iconRepository.findById(1L).orElseThrow(() -> new NoDataFoundException("아이콘을 찾을 수 없음"));

        Child child = childRepository.save(Child.builder()
                .nickname(signUpRequestDTO.getChildName())
                .birthday(signUpRequestDTO.getBirthday())
                .icon(icon)
                .build());

        User user = User.builder()
                .email(signUpRequestDTO.getEmail())
                .password(passwordEncoder.encode(signUpRequestDTO.getPassword()))
                .tts(true)
                .child(child)
                .lastSelectedChildId(child.getId())
                .build();
        try{
            userAuthRepository.save(user);
        }catch (Exception e){
            throw new DatabaseException("DB에 저장할 수 없습니다.");
        }
    }

    @Transactional
    public ResponseEntity<?> signIn(String email, String password) {
        User user = userAuthRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("아이디 혹은 비밀번호를 확인해 주세요."));

        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new IllegalArgumentException("아이디 혹은 비밀번호를 확인해 주세요.");
        }

        Token token = jwtProvider.generateToken(user.getEmail(), user.getRole());

        try{
            refreshTokenRedisRepository.save(RefreshToken.builder()
                    .email(user.getEmail())
                    .refreshToken(token.getRefreshToken())
                    .build());

        }catch (Exception e) {
            throw new DatabaseException("DB에 저장할 수 없습니다.");
        }

        Long lastSelectedChildId = user.getLastSelectedChildId();
        Child selectedChild = childRepository.findById(lastSelectedChildId).orElseThrow(() -> new NoDataFoundException("아이를 찾을 수 없음"));



        SignInResponseDTO signInResponseDTO = SignInResponseDTO.builder()
                .accessToken(token.getAccessToken())
                .refreshToken(token.getRefreshToken())
                .childId(user.getLastSelectedChildId())
                .iconUrl(selectedChild.getIcon().getUrlIcon())
                .nickname(selectedChild.getNickname()).build();

        return ResponseEntity.ok().body(signInResponseDTO);
    }

    public ResponseEntity<?> refresh(String token){
        if(token != null && jwtProvider.validToken(token)){
            RefreshToken refreshToken = refreshTokenRedisRepository.findByRefreshToken(token);
            if(refreshToken != null){
                Token newToken = jwtProvider.generateToken(refreshToken.getEmail(), Role.ROLE_USER);

                try {
                    refreshTokenRedisRepository.save(RefreshToken.builder()
                            .email(refreshToken.getEmail())
                            .refreshToken(newToken.getRefreshToken())
                            .build());
                }catch (Exception e){
                    throw new DatabaseException("DB에 저장할 수 없습니다.");
                }

                return ResponseEntity.ok(newToken);
            }

        }
        return ResponseEntity.badRequest().build();

    }
}
