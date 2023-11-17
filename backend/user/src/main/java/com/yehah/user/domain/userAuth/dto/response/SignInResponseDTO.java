package com.yehah.user.domain.userAuth.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignInResponseDTO {
    private String accessToken;
    private String refreshToken;
    private String iconUrl;
    private Long childId;
    private String nickname;

    @Builder
    public SignInResponseDTO(String accessToken, String refreshToken, String iconUrl, Long childId, String nickname){
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.iconUrl = iconUrl;
        this.childId = childId;
        this.nickname = nickname;
    }
}
