package com.yehah.draw.domain.animal.respository;

import com.yehah.draw.domain.animal.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
}
