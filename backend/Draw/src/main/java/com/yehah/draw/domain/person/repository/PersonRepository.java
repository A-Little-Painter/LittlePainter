package com.yehah.draw.domain.person.repository;

import com.yehah.draw.domain.person.entity.Person;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    Slice<Person> findSliceByChildId(Long childId, Pageable pageable);
}
