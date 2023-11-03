package com.yehah.user.domain.userAuth.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignInRequestDTO {
    public String email;
    public String password;

//    @Builder
//    public SignInRequestDTO(String email, String password){
//        this.email = email;
//        this.password = password;
//    }
}
