package com.yehah.user.domain.user.service;

import com.yehah.user.domain.user.dto.response.ChildrenResponseDTO;
import com.yehah.user.domain.userAuth.entity.Child;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    public List<ChildrenResponseDTO> getChildren();
}
