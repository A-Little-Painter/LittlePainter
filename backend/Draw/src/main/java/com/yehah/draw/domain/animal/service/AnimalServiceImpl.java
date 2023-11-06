package com.yehah.draw.domain.animal.service;

import com.yehah.draw.domain.animal.dto.response.AnimalDetailResDto;
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
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AnimalServiceImpl implements AnimalService {

    public final AnimalRepository animalRepository;

    public List<AnimalResDto> getAnimalList(){
        List<AnimalResDto> animalList = new ArrayList<>();
        for(Animal animal : animalRepository.findAll()){
            animalList.add(AnimalResDto.builder().animalId(animal.getId()).animalType(animal.getAnimalType())
                    .urlOriginal(animal.getUrlOriginal()).build());
        }
        return animalList;
    }

    public AnimalDetailResDto getAnimalTraceUrl(long animalId){
        Animal animal = animalRepository.findById(animalId).orElseThrow(
                () -> new IllegalArgumentException("해당 동물이 존재하지 않습니다.")
        );

        return AnimalDetailResDto.builder()
                .detail(animal.getDetail())
                .urlTrace(animal.getUrlTrace())
                .build();
    }

}
