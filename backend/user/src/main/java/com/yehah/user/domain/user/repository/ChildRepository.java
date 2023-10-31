package com.yehah.user.domain.user.repository;

import com.yehah.user.domain.userAuth.entity.Child;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChildRepository extends JpaRepository<Child, Long> {
}
