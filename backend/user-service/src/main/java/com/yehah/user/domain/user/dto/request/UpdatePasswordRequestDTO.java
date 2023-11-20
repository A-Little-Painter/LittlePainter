package com.yehah.user.domain.user.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatePasswordRequestDTO {
    private String password;
    private String newPassword;
}
