package com.yehah.auth.domain.auth.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
public class SendAuthCodeRequestDTO {
    private String email;
}
