package com.yehah.draw.domain.friends_animal.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yehah.draw.domain.animal_type.entity.AnimalType;
import com.yehah.draw.domain.animal_type.repository.AnimalTypeRepository;
import com.yehah.draw.domain.friends_animal.dto.response.FriendsAnimalListResDto;
import com.yehah.draw.domain.friends_animal.entity.FriendsAnimal;
import com.yehah.draw.domain.friends_animal.repository.FriendsAnimalRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FriendsAnimalServiceImpl implements FriendsAnimalService{

	private final AnimalTypeRepository animalTypeRepository;
	private final FriendsAnimalRepository friendsAnimalRepository;

	@Transactional(readOnly = true)
	public Slice<FriendsAnimalListResDto> getFriendsAnimalList(String animalTypeName, int pages){
		PageRequest pageRequest = PageRequest.of(pages, 30, Sort.by(Sort.Direction.DESC, "id"));
		Slice<FriendsAnimal> friendsAnimals;

		if(animalTypeName == null || animalTypeName.isEmpty()){
			friendsAnimals = friendsAnimalRepository.findSliceBy(pageRequest);
		} else{
			AnimalType animalType = animalTypeRepository.findByName(animalTypeName)
				.orElseThrow(() -> new IllegalArgumentException("해당 동물 종류가 없습니다."));
			friendsAnimals = friendsAnimalRepository.findByAnimalType_Id(animalType.getId(), pageRequest);
		}

		return friendsAnimals.map(this::convertToDto);
	}

	@Transactional
	public FriendsAnimalListResDto convertToDto(FriendsAnimal friendsAnimal){
		FriendsAnimalListResDto friendsAnimalListResDto = FriendsAnimalListResDto.builder()
			.friendsAnimalId(friendsAnimal.getId())
			.userEmail(friendsAnimal.getUserEmail())
			.title(friendsAnimal.getTitle())
			.originalImageUrl(friendsAnimal.getUrlOriginal())
			.build();

		return friendsAnimalListResDto;
	}
}

