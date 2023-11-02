package com.yehah.draw.domain.animal.service;

import com.yehah.draw.domain.animal.dto.response.AnimalResDto;
import com.yehah.draw.domain.animal.entity.Animal;

import java.util.List;


public interface AnimalService {
    public List<AnimalResDto> getAnimalList();

    public String getAnimalTraceUrl(long animalId);
}
