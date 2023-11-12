package com.yehah.draw.domain.animations.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


@Data
@NoArgsConstructor
public class AnimationTaleReqDto {
    private String roomId;
    private int pageNumber;
    private String title;
    private String requestCharacter;
    private MultipartFile originalFile;
    private MultipartFile newFile;

    @Builder
    public AnimationTaleReqDto(String roomId, int pageNumber, String title, String requestCharacter, MultipartFile originalFile, MultipartFile newFile) {
        this.roomId = roomId;
        this.pageNumber = pageNumber;
        this.title = title;
        this.requestCharacter = requestCharacter;
        this.originalFile = originalFile;
        this.newFile = newFile;
    }


}
