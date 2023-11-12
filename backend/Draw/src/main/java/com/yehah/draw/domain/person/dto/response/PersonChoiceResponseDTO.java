package com.yehah.draw.domain.person.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PersonChoiceResponseDTO {
    private String detail;
    private String urlTrace;

    @Builder
    public PersonChoiceResponseDTO(String detail, String urlTrace) {
        this.detail = detail;
        this.urlTrace = urlTrace;
    }
}
