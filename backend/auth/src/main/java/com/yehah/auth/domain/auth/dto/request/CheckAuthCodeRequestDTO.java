package com.yehah.auth.domain.auth.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
public class CheckAuthCodeRequestDTO {
    private String email;
    private String code;
}
