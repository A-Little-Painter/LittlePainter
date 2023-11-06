package com.yehah.draw.global.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.yehah.draw.domain.user.response.ChildResponseDTO;
import com.yehah.draw.global.common.CallUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;


@Slf4j
@Service
@RequiredArgsConstructor
public class JwtProvider {

    private final CallUser callUser;

    public Authentication getAuthentication(String email) {

        ChildResponseDTO childResponseDTO = callUser.getChildInfo(email);
        if(childResponseDTO == null) {
            return null;
        }

        return new UsernamePasswordAuthenticationToken(childResponseDTO, null, Collections.singleton(new SimpleGrantedAuthority(childResponseDTO.getRole())));
    }

}
