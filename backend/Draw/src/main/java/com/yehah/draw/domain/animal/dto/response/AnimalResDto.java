package com.yehah.draw.domain.animal.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AnimalResDto {
    private Long id;
    private String animalType;
    private String urlOriginal;

    @Builder
    public AnimalResDto(Long id, String animalType, String urlOriginal){
        this.id = id;
        this.animalType = animalType;
        this.urlOriginal = urlOriginal;
    }
}
