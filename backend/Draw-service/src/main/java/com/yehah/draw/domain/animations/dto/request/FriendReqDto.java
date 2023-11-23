package com.yehah.draw.domain.animations.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class FriendReqDto {
    private MultipartFile originalFile;
    private MultipartFile newFile;

    @Builder
    public FriendReqDto(MultipartFile originalFile, MultipartFile newFile){
        this.originalFile = originalFile;
        this.newFile = newFile;
    }
}
