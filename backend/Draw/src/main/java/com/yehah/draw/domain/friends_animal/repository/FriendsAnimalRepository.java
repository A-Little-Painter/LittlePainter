package com.yehah.draw.domain.friends_animal.repository;

import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yehah.draw.domain.friends_animal.entity.FriendsAnimal;

@Repository
public interface FriendsAnimalRepository extends JpaRepository<FriendsAnimal, Long> {
	Optional<FriendsAnimal> findById(Long id);
	Slice<FriendsAnimal> findSliceBy(Pageable pageable);

	Slice<FriendsAnimal> findByAnimalType_Id(Long animalTypeId, Pageable pageable);
}
