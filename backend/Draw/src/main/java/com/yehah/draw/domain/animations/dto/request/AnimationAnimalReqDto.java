package com.yehah.draw.domain.animations.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class AnimationAnimalReqDto {
    private MultipartFile image;
    private String animalType;

    @Builder
    public AnimationAnimalReqDto(MultipartFile image, String animalType){
        this.image = image;
        this.animalType = animalType;
    }
}
