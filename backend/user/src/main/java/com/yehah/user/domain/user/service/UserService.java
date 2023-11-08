package com.yehah.user.domain.user.service;

import com.yehah.user.domain.user.dto.request.AddChildRequestDTO;
import com.yehah.user.domain.user.dto.request.ChangeChildRequestDTO;
import com.yehah.user.domain.user.dto.request.ChangeIconRequestDTO;
import com.yehah.user.domain.user.dto.request.UpdatePasswordRequestDTO;
import com.yehah.user.domain.user.dto.response.ChildrenResponseDTO;
import com.yehah.user.domain.user.dto.response.GetChildInfoResponseDTO;
import com.yehah.user.domain.user.dto.response.GetIconsResponseDTO;
import com.yehah.user.domain.userAuth.entity.Child;
import com.yehah.user.domain.userAuth.entity.Icon;
import com.yehah.user.domain.userAuth.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    public List<ChildrenResponseDTO> getChildren();

    public List<GetIconsResponseDTO> getIcons();

    public ResponseEntity<?> addChild(AddChildRequestDTO addChildRequestDTO);

    public ResponseEntity<?> switchSound();

    public User getUserInfo(String email);

    public GetChildInfoResponseDTO getChildInfo(String email);

    public ResponseEntity<?> selectChild(Long childId);

    public ResponseEntity<?> changeIcon(ChangeIconRequestDTO changeIconRequestDTO);

    public ResponseEntity<?> updateChild(ChangeChildRequestDTO changeChildRequestDTO);

    public ResponseEntity<?> deleteUser();

    public ResponseEntity<?> updatePassword(UpdatePasswordRequestDTO updatePasswordRequestDTO);
}
