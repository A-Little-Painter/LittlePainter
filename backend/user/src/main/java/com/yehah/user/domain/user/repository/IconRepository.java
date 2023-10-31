package com.yehah.user.domain.user.repository;

import com.yehah.user.domain.userAuth.entity.Icon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IconRepository extends JpaRepository<Icon, Long> {
    Optional<Icon> findById(Long iconId);

}
