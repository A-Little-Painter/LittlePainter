package com.yehah.auth.domain.auth.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignInRequestDTO {
    public String email;
    public String password;
}
