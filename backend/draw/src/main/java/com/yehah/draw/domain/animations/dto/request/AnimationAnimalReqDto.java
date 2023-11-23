package com.yehah.draw.domain.animations.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class AnimationAnimalReqDto {
    private String roomId;
    private MultipartFile originalFile;
    private MultipartFile newFile;
    private String animalType;

    @Builder
    public AnimationAnimalReqDto(String roomId, MultipartFile originalFile, MultipartFile newFile, String animalType){
        this.roomId = roomId;
        this.originalFile = originalFile;
        this.newFile = newFile;
        this.animalType = animalType;
    }
}
