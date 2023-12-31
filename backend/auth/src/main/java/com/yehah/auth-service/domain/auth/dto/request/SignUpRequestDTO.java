package com.yehah.auth.domain.auth.dto.request;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class SignUpRequestDTO {
    private String email;
    private String password;
    private String childName;
    private LocalDate birthday;
}
