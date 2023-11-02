package com.yehah.draw.domain.detection.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AnimalDetectionResponseDTO {
    private String border_image;
    private String trace_image;
    private String animal_type;

    @Builder
    public AnimalDetectionResponseDTO(String border_image, String trace_image, String animal_type) {
        this.border_image = border_image;
        this.trace_image = trace_image;
        this.animal_type = animal_type;
    }
}
