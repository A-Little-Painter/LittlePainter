package com.yehah.user.domain.user.service;

import com.yehah.user.domain.user.dto.request.AddChildRequestDTO;
import com.yehah.user.domain.user.dto.response.ChildrenResponseDTO;
import com.yehah.user.domain.user.dto.response.GetIconsResponseDTO;
import com.yehah.user.domain.user.repository.IconRepository;
import com.yehah.user.domain.user.repository.UserRepository;
import com.yehah.user.domain.userAuth.entity.Child;
import com.yehah.user.domain.userAuth.entity.Icon;
import com.yehah.user.domain.userAuth.entity.User;
import jakarta.transaction.Transactional;
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
    private final IconRepository iconRepository;


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

    public List<GetIconsResponseDTO> getIcons(){
        return iconRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ChildrenResponseDTO toDTO(Child child){
        return ChildrenResponseDTO.builder()
                .id(child.getId())
                .nickname(child.getNickname())
                .birthday(child.getBirthday())
                .iconUrl(child.getIcon().getUrlIcon())
                .build();
    }

    public GetIconsResponseDTO toDTO(Icon icon){
        return GetIconsResponseDTO.builder()
                .iconId(icon.getId())
                .iconUrl(icon.getUrlIcon())
                .build();
    }

    @Transactional
    public ResponseEntity<?> addChild(AddChildRequestDTO addChildRequestDTO){
        User user = getLoginUser();
        log.info("user.getEmail() "+user.getEmail());
        Icon icon = iconRepository.findById(addChildRequestDTO.getIconId())
                .orElseThrow(() -> new IllegalArgumentException("아이콘을 찾을 수 없습니다."));
        return userRepository.findById(user.getId())
                .map(userFromDB -> {
                    Child child = Child.builder().
                            nickname(addChildRequestDTO.getNickname())
                            .birthday(addChildRequestDTO.getBirthday())
                            .icon(icon)
                            .build();
                    child.setUser(userFromDB);
                    userFromDB.getChildren().add(child);
                    userRepository.save(userFromDB);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.badRequest().build());
    }

    public ResponseEntity<?> switchSound(){
        User user = getLoginUser();
        log.info("user.getEmail() "+user.getEmail());
        return userRepository.findById(user.getId())
                .map(userFromDB -> {
                    userFromDB.toggleTts();
                    userRepository.save(userFromDB);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.badRequest().build());
    }



    private User getLoginUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
