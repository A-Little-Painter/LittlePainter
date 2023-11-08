package com.yehah.draw.domain.tale.dto.response;

import com.yehah.draw.domain.animal.entity.SimilarState;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TaleSimilarResDto {
    private Double similarValue;
    private SimilarState similarState;

    @Builder
    public TaleSimilarResDto(Double similarValue, SimilarState similarState) {
        this.similarValue = similarValue;
        this.similarState = similarState;
    }
}
