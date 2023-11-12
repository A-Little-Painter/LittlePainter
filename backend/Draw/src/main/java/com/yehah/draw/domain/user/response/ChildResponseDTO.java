package com.yehah.draw.domain.user.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChildResponseDTO {
    private Long userId;
    private Long childId;
    private String role;
    private String nickname;
}
