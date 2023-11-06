package com.yehah.draw.global.filter;

import com.yehah.draw.global.service.JwtProvider;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;

    @PostConstruct
    public void init() {
        log.info("----------------------------INIT_FILTER----------------------------");
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException{
        log.info("----------------------------DO_FILTER----------------------------");
        String email = request.getHeader("email");
        if (email != null) {
            // 인증 정보가 존재할 때의 처리
            Authentication authentication = jwtProvider.getAuthentication(email);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            log.info(email);
        } else {
            // 인증 정보가 존재하지 않을 때의 처리
            log.info("authentication is null");
        }

        filterChain.doFilter(request, response);
    }
}
