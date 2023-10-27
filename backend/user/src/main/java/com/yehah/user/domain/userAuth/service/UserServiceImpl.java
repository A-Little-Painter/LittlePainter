package com.yehah.user.domain.userAuth.service;

import com.yehah.user.domain.userAuth.dto.SignUpRequestDTO;
import com.yehah.user.domain.userAuth.entity.Child;
import com.yehah.user.domain.userAuth.entity.User;
import com.yehah.user.domain.userAuth.exception.AlreadyUsedEmailException;
import com.yehah.user.domain.userAuth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

//    @Transactional(readOnly = true)
    public void checkEmail(String email){
        if(userRepository.existsByEmail(email)){
            throw new AlreadyUsedEmailException("이미 사용중인 이메일입니다.");
        }
    }

    public void signup(SignUpRequestDTO signUpRequestDTO){
        Child child = Child.builder().nickname(signUpRequestDTO.getChildName()).birthday(signUpRequestDTO.getBirthday()).build();

        User user = User.builder()
                .email(signUpRequestDTO.getEmail())
                .password(passwordEncoder.encode(signUpRequestDTO.getPassword()))
                .tts(true)
                .child(child)
                .build();

        userRepository.save(user);
    }
}
