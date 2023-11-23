package com.yehah.draw.domain.animations.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class AnimationResDto {
    private String imageUrl;
    private String gifUrl;
    private String urlSound;

    public AnimationResDto(){}

    @Builder
    public AnimationResDto(String imageUrl, String gifUrl, String urlSound){
        this.imageUrl = imageUrl;
        this.gifUrl = gifUrl;
        this.urlSound = urlSound;
    }
}
