package com.yehah.draw.domain.animations.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


@Data
@NoArgsConstructor
public class AnimationTaleReqDto {
    private int pageNumber;
    private String title;
    private String requestCharacter;
    private MultipartFile image;

    @Builder
    public AnimationTaleReqDto(int pageNumber, String title, String requestCharacter, MultipartFile image) {
        this.pageNumber = pageNumber;
        this.title = title;
        this.requestCharacter = requestCharacter;
        this.image = image;
    }
}
