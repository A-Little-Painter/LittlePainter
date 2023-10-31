package com.yehah.user.domain.user.service;

import com.yehah.user.domain.user.dto.response.ChildrenResponseDTO;
import com.yehah.user.domain.user.repository.UserRepository;
import com.yehah.user.domain.userAuth.entity.Child;
import com.yehah.user.domain.userAuth.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;


    //User클래스에 있는 child를 가져오는 메소드
    public List<ChildrenResponseDTO> getChildren() {
        User user = getLoginUser();
        log.info("user.getEmail() "+user.getEmail());
        return userRepository.findById(user.getId())
                .map(userFromDB -> userFromDB.getChildren().stream()
                        .map(this::toDTO)
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());
    }

    //TODO : IconUrl DB에 넣기

    public ChildrenResponseDTO toDTO(Child child){
        return ChildrenResponseDTO.builder()
                .id(child.getId())
                .nickname(child.getNickname())
                .birthday(child.getBirthday())
                .iconUrl(child.getIcon().getUrlIcon())
                .build();
    }



    private User getLoginUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
