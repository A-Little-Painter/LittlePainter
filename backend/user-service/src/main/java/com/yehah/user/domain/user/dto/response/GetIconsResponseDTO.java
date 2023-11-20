package com.yehah.user.domain.user.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GetIconsResponseDTO {
    private Long iconId;
    private String iconUrl;

    @Builder
    public GetIconsResponseDTO(Long iconId, String iconUrl){
        this.iconId = iconId;
        this.iconUrl = iconUrl;
    }
}
