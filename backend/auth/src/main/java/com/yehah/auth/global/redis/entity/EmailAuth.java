package com.yehah.auth.global.redis.entity;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@RedisHash(value = "EmailAuth", timeToLive = 60 * 3)
public class EmailAuth {
    @Id
    private String email;

    @Indexed
    private String authCode;

    public EmailAuth(String email, String authCode){
        this.email = email;
        this.authCode = authCode;
    }
}
