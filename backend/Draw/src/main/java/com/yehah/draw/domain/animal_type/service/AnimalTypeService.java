package com.yehah.draw.domain.animal_type.service;

import java.util.List;

import com.yehah.draw.domain.animal_type.dto.response.AnimalTypeListResDto;

public interface AnimalTypeService {
	public List<AnimalTypeListResDto> getAnimalTypeList();
}
