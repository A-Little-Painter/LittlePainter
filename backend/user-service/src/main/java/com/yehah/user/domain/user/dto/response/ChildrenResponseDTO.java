package com.yehah.user.domain.user.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@RequiredArgsConstructor
public class ChildrenResponseDTO {
    private Long id;
    private String nickname;
    private LocalDate birthday;
    private String iconUrl;

    @Builder
    public ChildrenResponseDTO(Long id, String nickname, LocalDate birthday, String iconUrl){
        this.id = id;
        this.nickname = nickname;
        this.birthday = birthday;
        this.iconUrl = iconUrl;
    }
}
