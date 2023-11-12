package com.yehah.draw.domain.animal.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AnimalChoiceResDto {
    private String detail;
    private String urlTrace;

    @Builder
    public AnimalChoiceResDto(String detail, String urlTrace) {
        this.detail = detail;
        this.urlTrace = urlTrace;
    }
}
