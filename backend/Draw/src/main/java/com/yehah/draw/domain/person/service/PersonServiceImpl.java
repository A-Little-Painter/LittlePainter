package com.yehah.draw.domain.person.service;

import com.yehah.draw.domain.person.dto.response.PersonListResponseDTO;
import com.yehah.draw.domain.person.entity.Person;
import com.yehah.draw.domain.person.repository.PersonRepository;
import com.yehah.draw.domain.user.response.ChildResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService{
    private final PersonRepository personRepository;

    @Transactional(readOnly = true)
    public Slice<PersonListResponseDTO> getPersonList(int page){
        ChildResponseDTO child = (ChildResponseDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        PageRequest pageRequest = PageRequest.of(page, 20, Sort.by(Sort.Direction.DESC, "id"));
        Slice<Person> people;

        people = personRepository.findSliceByChildId(child.getChildId(), pageRequest);

        return people.map(this::convertToDto);
    }

    @Transactional
    public PersonListResponseDTO convertToDto(Person person){
        PersonListResponseDTO personListResponseDTO = PersonListResponseDTO.builder()
            .title(person.getTitle())
            .originalImageUrl(person.getUrlOriginal())
            .build();

        return personListResponseDTO;
    }

}
