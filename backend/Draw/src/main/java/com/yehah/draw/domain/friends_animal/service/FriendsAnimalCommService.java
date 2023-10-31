package com.yehah.draw.domain.friends_animal.service;

import org.springframework.web.multipart.MultipartFile;

import com.yehah.draw.domain.friends_animal.dto.request.AddFriendsAnimalReqDto;

public interface FriendsAnimalCommService {
	public Long addMyAnimalImage(
		MultipartFile originalImage, MultipartFile traceImage, AddFriendsAnimalReqDto addFriendsAnimalReqDto);
}
