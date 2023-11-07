package com.yehah.draw.domain.animations.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class AnimationAnimalResDto {
    private String gifImageUrl;

    @Builder
    public AnimationAnimalResDto(String gifImageUrl){
        this.gifImageUrl = gifImageUrl;
    }
}
