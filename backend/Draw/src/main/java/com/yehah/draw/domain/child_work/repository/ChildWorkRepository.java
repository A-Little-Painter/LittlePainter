package com.yehah.draw.domain.child_work.repository;

import com.yehah.draw.domain.child_work.entity.ChildWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChildWorkRepository extends JpaRepository<ChildWork, Long> {
}
