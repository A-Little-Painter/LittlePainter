package com.yehah.user.domain.userAuth.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RefreshTokenRequestDTO {
    private String refreshToken;
}
