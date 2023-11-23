package com.yehah.draw.domain.animal_type.service;

import java.util.List;

import com.yehah.draw.domain.animal_type.dto.response.AnimalTypeListResDto;
import com.yehah.draw.domain.animal_type.entity.AnimalType;
import com.yehah.draw.domain.animal_type.repository.AnimalTypeRepository;
import com.yehah.draw.domain.friends_animal.dto.response.FriendsAnimalListResDto;
import com.yehah.draw.domain.friends_animal.entity.FriendsAnimal;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AnimalTypeServiceImpl implements AnimalTypeService{

	private final AnimalTypeRepository animalTypeRepository;

	@Transactional(readOnly = true)
	public List<AnimalTypeListResDto> getAnimalTypeList(){
		return animalTypeRepository.findAllBy();
	}

}
