package com.yehah.draw.domain.person.dto.response;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PersonListResponseDTO {
    private Long personId;
    private String title;
    private String originalImageUrl;
}
