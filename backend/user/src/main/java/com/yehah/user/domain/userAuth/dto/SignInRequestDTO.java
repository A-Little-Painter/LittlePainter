package com.yehah.user.domain.userAuth.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignInRequestDTO {
    public String email;
    public String password;
}
