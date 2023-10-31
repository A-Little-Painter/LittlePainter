package com.yehah.draw.domain.animal_type.repository;

import java.util.Optional;

import com.yehah.draw.domain.animal_type.entity.AnimalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalTypeRepository extends JpaRepository<AnimalType, Long> {
	Optional<AnimalType> findByName(String name);
}
