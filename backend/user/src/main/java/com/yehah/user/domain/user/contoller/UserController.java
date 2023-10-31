package com.yehah.user.domain.user.contoller;

import com.yehah.user.domain.user.dto.request.AddChildRequestDTO;
import com.yehah.user.domain.user.dto.response.AddChildResponseDTO;
import com.yehah.user.domain.user.dto.response.ChildrenResponseDTO;
import com.yehah.user.domain.user.dto.response.GetIconsResponseDTO;
import com.yehah.user.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    //아이 조회
    @Operation(summary = "아이 조회", description = "USER")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이 조회 성공"),
            @ApiResponse(responseCode = "401", description = "아이 없음"),
            @ApiResponse(responseCode = "402", description = "DTO 변환 실패"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 아이디")
    })
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

    //아이 추가
    @PostMapping("/child")
    public ResponseEntity<?> addChild(@RequestBody AddChildRequestDTO addChildRequestDTO){
        return userService.addChild(addChildRequestDTO);
    }

    //음성 설정(tts 설정)
    @PatchMapping("/sound")
    public ResponseEntity<?> switchSound(){
        return userService.switchSound();
    }
}
