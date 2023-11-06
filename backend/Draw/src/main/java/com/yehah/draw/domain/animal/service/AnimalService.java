package com.yehah.draw.domain.animal.service;

import com.yehah.draw.domain.animal.dto.response.AnimalChoiceResDto;
import com.yehah.draw.domain.animal.dto.response.AnimalResDto;

import java.util.List;


public interface AnimalService {
    public List<AnimalResDto> getAnimalList();

    public AnimalChoiceResDto getAnimalChoiceData(long animalId);
}
