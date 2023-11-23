package com.yehah.draw.domain.animations.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class AnimationFriendReqDto {
    private String roomId;
    private MultipartFile originalFile;
    private MultipartFile newFile;

    @Builder
    public AnimationFriendReqDto(String roomId, MultipartFile originalFile, MultipartFile newFile){
        this.roomId = roomId;
        this.originalFile = originalFile;
        this.newFile = newFile;
    }
}
