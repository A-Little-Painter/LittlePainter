package com.yehah.user.domain.user.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GetChildInfoResponseDTO {
    private Long childId;
    private Long userId;
    private String nickname;
    private String role;

    @Builder
    public GetChildInfoResponseDTO(Long childId, Long userId, String nickname, String role){
        this.childId = childId;
        this.userId = userId;
        this.nickname = nickname;
        this.role = role;
    }
}
