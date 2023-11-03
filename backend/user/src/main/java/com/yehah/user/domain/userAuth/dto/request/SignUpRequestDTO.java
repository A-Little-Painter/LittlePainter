package com.yehah.user.domain.userAuth.dto.request;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class SignUpRequestDTO {
    private String email;
    private String password;
    private String childName;
    private LocalDate birthday;

    @Builder
    public SignUpRequestDTO(String email, String password, String childName, LocalDate birthday){
        this.email = email;
        this.password = password;
        this.childName = childName;
        this.birthday = birthday;
    }
}