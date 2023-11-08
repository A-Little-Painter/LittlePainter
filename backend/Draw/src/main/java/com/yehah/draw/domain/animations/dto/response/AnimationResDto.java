package com.yehah.draw.domain.animations.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AnimationResDto {
    private String gifImageUrl;

    @Builder
    public AnimationResDto(String gifImageUrl){
        this.gifImageUrl = gifImageUrl;
    }
}
