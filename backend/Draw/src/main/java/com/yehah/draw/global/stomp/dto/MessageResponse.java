package com.yehah.draw.global.stomp.dto;

import com.yehah.draw.domain.animal.entity.SimilarState;
import com.yehah.draw.global.common.AnimalType;
import com.yehah.draw.global.stomp.ResponseState;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class MessageResponse {
    private String roomId;
    private AnimalType animalType;
    private String message;
    private ResponseState responseState;

    @Builder
    public MessageResponse(String roomId, AnimalType animalType, String message, ResponseState responseState) {
        this.roomId = roomId;
        this.animalType = animalType;
        this.message = message;
        this.responseState = responseState;
    }
}
