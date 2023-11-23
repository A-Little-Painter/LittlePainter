package com.yehah.draw.domain.person.service;

import com.yehah.draw.domain.friends_animal.dto.request.AddFriendsAnimalReqDto;
import com.yehah.draw.domain.person.dto.request.AddPersonRequestDTO;

public interface PersonCommService {
    public Long addPersonImage(AddPersonRequestDTO addPersonRequestDTO);
}
