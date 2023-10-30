package com.yehah.user.global.security.service;

import com.yehah.user.global.security.entity.Token;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.*;

import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtProvider {
    @Value("${jwt.secret.key}")
    private String SECRET_KEY;

    @Value("${jwt.access_token.expiration_time}")
    private long ACCESS_TOKEN_EXPIRATION_TIME;

    @Value("${jwt.refresh_token.expiration_time}")
    private long REFRESH_TOKEN_EXPIRATION_TIME;

    public Token generateToken(String email){
        String accessToken = Jwts.builder()
                .setSubject(email)
                .claim("role", "ROLE_USER")
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME * 1000))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();

        String refreshToken = Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME * 1000))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();

        return Token.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
