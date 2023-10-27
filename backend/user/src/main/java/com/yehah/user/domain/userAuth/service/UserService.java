package com.yehah.user.domain.userAuth.service;

import com.yehah.user.domain.userAuth.dto.SignUpRequestDTO;

public interface UserService {
    public void checkEmail(String email);

    public void signup(SignUpRequestDTO signUpRequestDTO);
}
