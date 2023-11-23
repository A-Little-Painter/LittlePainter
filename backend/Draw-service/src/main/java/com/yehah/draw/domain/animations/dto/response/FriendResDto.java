package com.yehah.draw.domain.animations.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FriendResDto {
    private String imageUrl;
    private String gifUrl;

    @Builder
    public FriendResDto(String imageUrl){
        this.imageUrl = imageUrl;
        this.gifUrl = gifUrl;
    }
}
