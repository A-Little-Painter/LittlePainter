package com.yehah.draw.domain.animations.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class AnimationResDto {
    private String imageUrl;
    private String gifUrl;

    public AnimationResDto(){}

    @Builder
    public AnimationResDto(String imageUrl, String gifUrl){
        this.imageUrl = imageUrl;
        this.gifUrl = gifUrl;
    }
}
