package com.yehah.draw.domain.animal.respository;

import com.yehah.draw.domain.animal.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    public List<Animal> findAll();

    public Optional<Animal> findById(long id);

    public Optional<Animal> findByAnimalType(String animalType);
}
