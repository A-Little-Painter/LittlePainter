package com.yehah.draw.domain.friends_animal.service;

import org.springframework.data.domain.Slice;

import com.yehah.draw.domain.friends_animal.dto.response.FriendsAnimalListResDto;

public interface FriendsAnimalService {
	public Slice<FriendsAnimalListResDto> getFriendsAnimalList(String animalTypeName, int pages);
	public String getFriendsAnimalTraceUrl(Long friendsAnimalId);
}
