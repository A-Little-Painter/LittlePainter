package com.yehah.draw.domain.animal.service;

import com.yehah.draw.domain.animal.dto.response.AnimalResDto;
import com.yehah.draw.domain.animal.entity.Animal;
import com.yehah.draw.domain.animal.respository.AnimalRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AnimalServiceImpl implements AnimalService {

    public final AnimalRepository animalRepository;

    public List<AnimalResDto> getAnimalList(){
        List<AnimalResDto> animalList = new ArrayList<>();
        for(Animal animal : animalRepository.findAll()){
            animalList.add(AnimalResDto.builder().id(animal.getId()).animalType(animal.getAnimalType())
                    .urlOriginal(animal.getUrlOriginal()).build());
        }
        return animalList;
    }

    public String getAnimalTraceUrl(long id){
        return animalRepository.findById(id).getUrlTrace();
    }
}
