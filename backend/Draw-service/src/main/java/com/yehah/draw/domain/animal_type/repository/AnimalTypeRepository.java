package com.yehah.draw.domain.animal_type.repository;

import java.util.List;
import java.util.Optional;

import com.yehah.draw.domain.animal_type.dto.response.AnimalTypeListResDto;
import com.yehah.draw.domain.animal_type.entity.AnimalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalTypeRepository extends JpaRepository<AnimalType, Long> {
	List<AnimalTypeListResDto> findAllBy();
	Optional<AnimalType> findByName(String name);
	boolean existsById(Long id);
}
