package com.yehah.draw.domain.animal_type.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yehah.draw.domain.animal_type.dto.response.AnimalTypeListResDto;
import com.yehah.draw.domain.animal_type.service.AnimalTypeService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/api/v1/draws/animal-types")
@RestController
@RequiredArgsConstructor
public class AnimalTypeController {

	private final AnimalTypeService animalTypeService;

	@Operation(summary = "동물 종류 목록 조회", description = "동물 종류의 전체 목록을 조회한다.")
	@GetMapping("")
	public ResponseEntity<List<AnimalTypeListResDto>> getAnimalTypeList(){
		log.debug("getAnimalTypeList()");
		return ResponseEntity.ok(animalTypeService.getAnimalTypeList());
	}

}
