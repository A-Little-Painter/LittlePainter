package com.yehah.auth.domain.auth.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatePasswordRequestDTO {
    private String email;
    private String password;
}
