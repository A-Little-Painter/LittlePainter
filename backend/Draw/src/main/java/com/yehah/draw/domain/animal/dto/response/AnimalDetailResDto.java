package com.yehah.draw.domain.animal.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AnimalDetailResDto {
    private String detail;
    private String urlTrace;

    @Builder
    public AnimalDetailResDto(String detail, String urlTrace) {
        this.detail = detail;
        this.urlTrace = urlTrace;
    }
}
