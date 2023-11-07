package com.yehah.draw.domain.animations.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class AnimationAnimalResDto {
    private byte[] gifImage;

    @Builder
    public AnimationAnimalResDto(byte[] gifImage){
        this.gifImage = gifImage;
    }
}
