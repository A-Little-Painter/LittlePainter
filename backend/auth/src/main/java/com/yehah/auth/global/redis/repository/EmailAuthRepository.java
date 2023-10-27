package com.yehah.auth.global.redis.repository;

import com.yehah.auth.global.redis.entity.EmailAuth;
import org.springframework.data.repository.CrudRepository;

public interface EmailAuthRepository extends CrudRepository<EmailAuth, String> {
    EmailAuth findByAuthCode(String authCode);
}
