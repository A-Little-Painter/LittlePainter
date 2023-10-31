package com.yehah.draw.domain.friends_animal.service;

import org.springframework.data.domain.Slice;

import com.yehah.draw.domain.friends_animal.dto.response.FriendsAnimalListResponse;

public interface FriendsAnimalService {
	public Slice<FriendsAnimalListResponse> getFriendsAnimals (String animalTypeName, int pages);
}
