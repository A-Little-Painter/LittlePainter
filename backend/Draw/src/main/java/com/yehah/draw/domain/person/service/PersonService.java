package com.yehah.draw.domain.person.service;

import com.yehah.draw.domain.person.dto.response.PersonListResponseDTO;
import org.springframework.data.domain.Slice;

public interface PersonService {
    public Slice<PersonListResponseDTO> getPersonList(int page);
}
