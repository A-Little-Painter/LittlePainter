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
public class SimilarMessageResponse {
    private String roomId;
    private AnimalType animalType;
    private Double similarValue;
    private SimilarState similarState;
    private ResponseState responseState;
    private String message;

    @Builder
    public SimilarMessageResponse(String roomId, AnimalType animalType, Double similarValue, ResponseState responseState, String message) {
        this.roomId = roomId;
        this.animalType = animalType;
        this.similarValue = similarValue;
        this.responseState = responseState;
        this.message = message;
    }

}
