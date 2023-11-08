package com.yehah.user.domain.user.repository;

import com.yehah.user.domain.userAuth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findById(Long userId);
    Optional<User> findByEmail(String email);
}
