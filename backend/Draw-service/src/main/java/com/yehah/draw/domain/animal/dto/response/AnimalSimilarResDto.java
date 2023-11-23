package com.yehah.draw.domain.animal.dto.response;

import com.yehah.draw.domain.animal.entity.SimilarState;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AnimalSimilarResDto {
    private Double similarValue;
    private SimilarState similarState;

    @Builder
    public AnimalSimilarResDto(Double similarValue, SimilarState similarState) {
        this.similarValue = similarValue;
        this.similarState = similarState;
    }
}
