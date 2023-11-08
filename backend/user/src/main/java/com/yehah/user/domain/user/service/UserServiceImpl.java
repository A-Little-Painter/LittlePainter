package com.yehah.user.domain.user.service;

import com.yehah.user.domain.user.dto.request.AddChildRequestDTO;
import com.yehah.user.domain.user.dto.request.ChangeChildRequestDTO;
import com.yehah.user.domain.user.dto.request.ChangeIconRequestDTO;
import com.yehah.user.domain.user.dto.request.UpdatePasswordRequestDTO;
import com.yehah.user.domain.user.dto.response.ChildrenResponseDTO;
import com.yehah.user.domain.user.dto.response.GetChildInfoResponseDTO;
import com.yehah.user.domain.user.dto.response.GetIconsResponseDTO;
import com.yehah.user.domain.user.exception.DTOConversionException;
import com.yehah.user.domain.user.exception.DatabaseException;
import com.yehah.user.domain.user.exception.NoDataFoundException;
import com.yehah.user.domain.user.exception.UserNotFoundException;
import com.yehah.user.domain.user.repository.ChildRepository;
import com.yehah.user.domain.user.repository.IconRepository;
import com.yehah.user.domain.user.repository.UserRepository;
import com.yehah.user.domain.userAuth.entity.Child;
import com.yehah.user.domain.userAuth.entity.Icon;
import com.yehah.user.domain.userAuth.entity.User;
import com.yehah.user.domain.userAuth.exception.PasswordNotMatchException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final IconRepository iconRepository;
    private final ChildRepository childRepository;

    private final PasswordEncoder passwordEncoder;

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

    public ResponseEntity<?> selectChild(Long childId){
        User user = getLoginUser();
        log.info("user.getEmail() "+user.getEmail());
        return userRepository.findById(user.getId())
                .map(userFromDB -> {
                    try{
                        userRepository.save(user.updateSelectChild(User.builder()
                                .lastSelectedChildId(childId).build()));
                    }catch (Exception e){
                        throw new DatabaseException("DB 변경 불가능.");
                    }
                    return ResponseEntity.ok().build();
                })
                .orElseThrow(() -> new UserNotFoundException("로그인 사용자를 찾을 수 없습니다."));
    }

    @Transactional
    public User getUserInfo(String email){
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
    }

    @Transactional
    public GetChildInfoResponseDTO getChildInfo(String email){
        log.info(email);
        return userRepository.findByEmail(email)
                .map(user -> {
                    Child selectedChild = user.getChildren().stream()
                            .filter(child -> child.getId().equals(user.getLastSelectedChildId()))
                            .findFirst().orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이입니다."));

                    return GetChildInfoResponseDTO.builder()
                            .userId(user.getId())
                            .childId(user.getLastSelectedChildId())
                            .nickname(selectedChild.getNickname())
                            .role(user.getRole().toString())
                            .build();
                })
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
    }

    public ResponseEntity<?>  changeIcon(ChangeIconRequestDTO changeIconRequestDTO){
        User user = getLoginUser();
        log.info("user.getEmail() "+user.getEmail());
        Icon icon = iconRepository.findById(changeIconRequestDTO.getIconId())
                .orElseThrow(() -> new IllegalArgumentException("아이콘을 찾을 수 없습니다."));
        return userRepository.findById(user.getId())
                .map(userFromDB -> {
                    Child selectedChild = userFromDB.getChildren().stream()
                            .filter(child -> child.getId().equals(userFromDB.getLastSelectedChildId()))
                            .findFirst().orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이입니다."));
                    try{
                        childRepository.save(selectedChild.updateIcon(icon));
                    }catch (Exception e){
                        throw new DatabaseException("DB에 저장할 수 없습니다.");
                    }
                    return ResponseEntity.ok().body("아이콘 변경 성공");
                })
                .orElseThrow(() -> new UserNotFoundException("로그인 사용자를 찾을 수 없습니다."));
    }

    public ResponseEntity<?> updateChild(ChangeChildRequestDTO changeChildRequestDTO){
        User user = getLoginUser();
        log.info("user.getEmail() "+user.getEmail());
        return userRepository.findById(user.getId())
                .map(userFromDB -> {
                    Child selectedChild = userFromDB.getChildren().stream()
                            .filter(child -> child.getId().equals(changeChildRequestDTO.getChildId()))
                            .findFirst().orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이입니다."));
                    try{
                        childRepository.save(selectedChild.updateChild(changeChildRequestDTO.getNickname(), changeChildRequestDTO.getBirthday()));
                    }catch (Exception e){
                        throw new DatabaseException("DB에 저장할 수 없습니다.");
                    }
                    return ResponseEntity.ok().build();
                })
                .orElseThrow(() -> new UserNotFoundException("로그인 사용자를 찾을 수 없습니다."));
    }

    public ResponseEntity<?> deleteUser(){
        User user = getLoginUser();
        log.info("user.getEmail() "+user.getEmail());
        return userRepository.findById(user.getId())
                .map(userFromDB -> {
                    try{
                        userRepository.save(userFromDB.deleteUser());
                    }catch (Exception e){
                        throw new DatabaseException("DB 접근 오류");
                    }
                    return ResponseEntity.ok().build();
                })
                .orElseThrow(() -> new UserNotFoundException("로그인 사용자를 찾을 수 없습니다."));
    }

    public ResponseEntity<?> updatePassword(UpdatePasswordRequestDTO updatePasswordRequestDTO){
        User user = getLoginUser();
        if(!passwordEncoder.matches(updatePasswordRequestDTO.getPassword(), user.getPassword())) {
            throw new PasswordNotMatchException("기존 비밀번호가 일치하지 않습니다.");
        }

        if(updatePasswordRequestDTO.getPassword().equals(updatePasswordRequestDTO.getNewPassword())) {
            throw new PasswordNotMatchException("기존 비밀번호와 동일합니다.");
        }

        userRepository.save(user.updatePassword(passwordEncoder.encode(updatePasswordRequestDTO.getNewPassword())));

        return ResponseEntity.ok().build();
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
            throw new DTOConversionException("ICON에서 DTO 변환 시 오류");
        }

    }
}
