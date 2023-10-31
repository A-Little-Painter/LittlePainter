package com.yehah.user.domain.user.service;

import com.mysql.cj.exceptions.DataConversionException;
import com.yehah.user.domain.user.dto.request.AddChildRequestDTO;
import com.yehah.user.domain.user.dto.response.ChildrenResponseDTO;
import com.yehah.user.domain.user.dto.response.GetIconsResponseDTO;
import com.yehah.user.domain.user.exception.DTOConversionException;
import com.yehah.user.domain.user.exception.DatabaseException;
import com.yehah.user.domain.user.exception.NoDataFoundException;
import com.yehah.user.domain.user.exception.UserNotFoundException;
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
        List<ChildrenResponseDTO> children = userRepository.findById(user.getId())
                .map(userFromDB -> userFromDB.getChildren().stream()
                        .map(this::toDTO)
                        .collect(Collectors.toList()))
                .orElseThrow(() -> new UserNotFoundException("로그인 사용자를 DB에서 찾을 수 없습니다."));

        if(children.isEmpty()){
            throw new NoDataFoundException("아이를 찾을 수 없습니다.");
        }

        return children;
    }

    public List<GetIconsResponseDTO> getIcons(){
        List<GetIconsResponseDTO> icons = iconRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());

        if(icons.isEmpty()){
            throw new NoDataFoundException("아이콘을 찾을 수 없습니다.");
        }

        return icons;

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
                    try{
                        userRepository.save(userFromDB);
                    }catch(Exception e){
                        throw new DatabaseException("DB에 저장할 수 없습니다.");
                    }
                    return ResponseEntity.ok().build();
                })
                .orElseThrow(() -> new UserNotFoundException("로그인 사용자를 찾을 수 없습니다."));
    }

    public ResponseEntity<?> switchSound(){
        User user = getLoginUser();
        log.info("user.getEmail() "+user.getEmail());
        return userRepository.findById(user.getId())
                .map(userFromDB -> {
                    userFromDB.toggleTts();
                    try{
                        userRepository.save(userFromDB);
                    }catch (Exception e){
                        throw new DatabaseException("DB에 저장할 수 없습니다.");
                    }
                    return ResponseEntity.ok().build();
                })
                .orElseThrow(() -> new UserNotFoundException("로그인 사용자를 찾을 수 없습니다."));
    }



    private User getLoginUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public ChildrenResponseDTO toDTO(Child child){
        try{
            return ChildrenResponseDTO.builder()
                    .id(child.getId())
                    .nickname(child.getNickname())
                    .birthday(child.getBirthday())
                    .iconUrl(child.getIcon().getUrlIcon())
                    .build();
        }catch (Exception e){
            throw new DTOConversionException("Child에서 DTO 변환 시 오류");
        }

    }

    public GetIconsResponseDTO toDTO(Icon icon){
        try{
            return GetIconsResponseDTO.builder()
                    .iconId(icon.getId())
                    .iconUrl(icon.getUrlIcon())
                    .build();
        }catch (Exception e){
            throw new DTOConversionException("Child에서 DTO 변환 시 오류");
        }

    }
}
