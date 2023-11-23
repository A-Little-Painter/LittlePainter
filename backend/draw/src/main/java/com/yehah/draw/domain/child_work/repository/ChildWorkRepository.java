package com.yehah.draw.domain.child_work.repository;

import com.yehah.draw.domain.child_work.entity.ChildWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChildWorkRepository extends JpaRepository<ChildWork, Long> {
    List<ChildWork> findByChildIdAndCategoryId(Long childId, Long categoryId);
    List<ChildWork> findAll();
}
