package com.yehah.user.global.security.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@Builder
@RedisHash(value = "refresh", timeToLive = 604800)
public class RefreshToken {
    @Id
    private String email;

    @Indexed
    private String refreshToken;
}
