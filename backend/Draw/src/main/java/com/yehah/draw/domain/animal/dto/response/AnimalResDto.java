package com.yehah.draw.domain.animal.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AnimalResDto {
    private Long animalId;
    private String animalType;
    private String urlOriginal;

    @Builder
    public AnimalResDto(Long animalId, String animalType, String urlOriginal){
        this.animalId = animalId;
        this.animalType = animalType;
        this.urlOriginal = urlOriginal;
    }
}
