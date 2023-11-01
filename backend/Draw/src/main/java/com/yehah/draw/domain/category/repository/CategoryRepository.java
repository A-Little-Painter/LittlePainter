package com.yehah.draw.domain.category.repository;

import com.yehah.draw.domain.category.entity.Category;
import com.yehah.draw.domain.child_work.entity.ChildWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(String name);
}
