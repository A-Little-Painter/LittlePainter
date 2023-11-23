package com.yehah.draw.domain.friends_animal.service;

import com.yehah.draw.domain.animal.dto.response.AnimalChoiceResDto;
import org.springframework.data.domain.Slice;

import com.yehah.draw.domain.friends_animal.dto.response.FriendsAnimalListResDto;

public interface FriendsAnimalService {
	public Slice<FriendsAnimalListResDto> getFriendsAnimalList(Long animalTypeId, int page);
	public AnimalChoiceResDto getAnimalChoiceData(Long friendsAnimalId);
}
