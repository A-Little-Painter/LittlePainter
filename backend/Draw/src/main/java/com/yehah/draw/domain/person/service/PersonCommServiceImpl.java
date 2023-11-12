package com.yehah.draw.domain.person.service;

import com.yehah.draw.domain.person.dto.request.AddPersonRequestDTO;
import com.yehah.draw.domain.person.entity.Person;
import com.yehah.draw.domain.person.repository.PersonRepository;
import com.yehah.draw.domain.user.response.ChildResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PersonCommServiceImpl implements PersonCommService {
    private final PersonRepository personRepository;
    public Long addPersonImage(AddPersonRequestDTO addPersonRequestDTO){
        ChildResponseDTO child = (ChildResponseDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Person person = Person.builder()
                .title(addPersonRequestDTO.getTitle())
                .detail(addPersonRequestDTO.getDetail())
                .urlOriginal(addPersonRequestDTO.getOriginalUrl())
                .urlTrace(addPersonRequestDTO.getTraceUrl())
                .childId(child.getChildId())
                .build();

        return personRepository.save(person).getId();
    }
}
