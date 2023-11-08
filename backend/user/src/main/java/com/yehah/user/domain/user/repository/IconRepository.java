package com.yehah.user.domain.user.repository;

import com.yehah.user.domain.userAuth.entity.Icon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IconRepository extends JpaRepository<Icon, Long> {
    Optional<Icon> findById(Long iconId);

}
