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
	public Slice<FriendsAnimalListResDto> getFriendsAnimalList(Long animalTypeId, int page){
		PageRequest pageRequest = PageRequest.of(page, 20, Sort.by(Sort.Direction.DESC, "id"));
		Slice<FriendsAnimal> friendsAnimals;

		if(animalTypeId == 0){
			// 동물 종류 전체
			friendsAnimals = friendsAnimalRepository.findSliceBy(pageRequest);
		} else if(animalTypeId != 0 && animalTypeRepository.existsById(animalTypeId)) {
			// 특정 종류 전체
			friendsAnimals = friendsAnimalRepository.findByAnimalType_Id(animalTypeId, pageRequest);
		} else {
			throw new IllegalArgumentException("해당 동물 종류가 없습니다.");
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

	public String getFriendsAnimalTraceUrl(Long friendsAnimalId){
		FriendsAnimal friendsAnimal = friendsAnimalRepository.findById(friendsAnimalId).orElseThrow(
				() -> new IllegalArgumentException("테두리 정보를 가지고 있지 않습니다."));
		return friendsAnimal.getUrlTrace();
	}
}

