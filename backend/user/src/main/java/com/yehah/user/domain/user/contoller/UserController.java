package com.yehah.user.domain.user.contoller;

import com.yehah.user.domain.user.dto.response.ChildrenResponseDTO;
import com.yehah.user.domain.user.dto.response.GetIconsResponseDTO;
import com.yehah.user.domain.user.service.UserService;
import com.yehah.user.domain.userAuth.entity.Child;
import com.yehah.user.domain.userAuth.entity.Icon;
import com.yehah.user.domain.userAuth.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    //아이 조회
    @GetMapping("/child")
    public ResponseEntity<?> getChildren(){
        List<ChildrenResponseDTO> children = userService.getChildren();
        return ResponseEntity.ok(children);
    }

    //전체 아이콘 종류 가져오기
    @GetMapping("/icons")
    public ResponseEntity<?> getIcons(){
        List<GetIconsResponseDTO> icons = userService.getIcons();
        return ResponseEntity.ok(icons);
    }

//    //아이 추가
//    @PostMapping("/child")
//    public ResponseEntity<?> addChild(){
//        return ResponseEntity.ok().build();
//    }
}
