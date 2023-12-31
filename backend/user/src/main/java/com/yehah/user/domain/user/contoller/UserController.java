package com.yehah.user.domain.user.contoller;

import com.yehah.user.domain.user.dto.request.*;
import com.yehah.user.domain.user.dto.response.AddChildResponseDTO;
import com.yehah.user.domain.user.dto.response.ChildrenResponseDTO;
import com.yehah.user.domain.user.dto.response.GetChildInfoResponseDTO;
import com.yehah.user.domain.user.dto.response.GetIconsResponseDTO;
import com.yehah.user.domain.user.service.UserService;
import com.yehah.user.domain.userAuth.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@Tag(name= "users", description = "사용자 API")
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
    @Operation(summary = "전체 아이콘 종류 가져오기", description = "USER")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이콘 종류 가져오기 성공"),
            @ApiResponse(responseCode = "512", description = "아이콘 없음")
    })
    @GetMapping("/icons")
    public ResponseEntity<?> getIcons(){
        List<GetIconsResponseDTO> icons = userService.getIcons();
        return ResponseEntity.ok(icons);
    }

    //아이 추가
    @Operation(summary = "아이 추가", description = "USER")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이 추가 성공"),
            @ApiResponse(responseCode = "510", description = "아이콘 찾을 수 없음"),
            @ApiResponse(responseCode = "511", description = "DB 저장 실패"),
            @ApiResponse(responseCode = "512", description = "사용자 못 찾음")
    })
    @PostMapping("/child")
    public ResponseEntity<?> addChild(@RequestBody AddChildRequestDTO addChildRequestDTO){
        return userService.addChild(addChildRequestDTO);
    }

    //음성 설정(tts 설정)
    @Operation(summary = "음성 설정(tts 설정)", description = "USER")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "음성 설정 성공"),
            @ApiResponse(responseCode = "511", description = "DB 접근 실패"),
            @ApiResponse(responseCode = "512", description = "사용자 못 찾음")
    })
    @PatchMapping("/sound")
    public ResponseEntity<?> switchSound(){
        return userService.switchSound();
    }

    //아이 선택
    @Operation(summary = "아이 선택", description = "USER")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이 선택 성공"),
            @ApiResponse(responseCode = "511", description = "DB 접근 실패"),
            @ApiResponse(responseCode = "512", description = "사용자 못 찾음")
    })
    @PatchMapping("/select-child/{childId}")
    public ResponseEntity<?> selectChild(@PathVariable Long childId){
        return userService.selectChild(childId);
    }

    //아이 아이콘 변경
    @Operation(summary = "아이 아이콘 변경", description = "USER")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이 아이콘 변경 성공"),
            @ApiResponse(responseCode = "511", description = "DB 접근 실패"),
            @ApiResponse(responseCode = "512", description = "사용자 못 찾음")
    })
    @PatchMapping("/icons")
    public ResponseEntity<?> changeIcon(@RequestBody ChangeIconRequestDTO changeIconRequestDTO){
        return userService.changeIcon(changeIconRequestDTO);
    }

    //아이 정보 수정
    @Operation(summary = "아이 정보 수정", description = "USER")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이 정보 수정 성공"),
            @ApiResponse(responseCode = "511", description = "DB 접근 실패"),
            @ApiResponse(responseCode = "512", description = "사용자 못 찾음")
    })
    @PatchMapping("/child")
    public ResponseEntity<?> updateChild(@RequestBody ChangeChildRequestDTO changeChildRequestDTO){
        return userService.updateChild(changeChildRequestDTO);
    }

    //유저 탈퇴
    @Operation(summary = "유저 탈퇴", description = "USER")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "유저 탈퇴 성공"),
            @ApiResponse(responseCode = "511", description = "DB 접근 실패"),
            @ApiResponse(responseCode = "512", description = "사용자 못 찾음")
    })
    @DeleteMapping
    public ResponseEntity<?> deleteUser(){
        return userService.deleteUser();
    }

    //유저 비밀번호 변경
    @Operation(summary = "유저 비밀번호 변경", description = "USER")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "유저 탈퇴 성공"),
            @ApiResponse(responseCode = "511", description = "DB 접근 실패"),
            @ApiResponse(responseCode = "512", description = "사용자 못 찾음")
    })
    @PatchMapping("/password")
    public ResponseEntity<?> changePassword(@RequestBody UpdatePasswordRequestDTO updatePasswordRequestDTO){
        return userService.updatePassword(updatePasswordRequestDTO);
    }

    //아이 삭제
    @Operation(summary = "아이 삭제", description = "USER")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이 삭제 성공"),
            @ApiResponse(responseCode = "511", description = "DB 접근 실패"),
            @ApiResponse(responseCode = "512", description = "사용자 못 찾음")
    })
    @DeleteMapping("/child/{childId}")
    public ResponseEntity<?> deleteChild(@PathVariable Long childId){
        return userService.deleteChild(childId);
    }


    //유저 정보 가져오기(타 마이크로서비스 유저 정보가져오기)
    @Operation(summary = "유저 정보 가져오기(타 마이크로서비스 유저 정보가져오기)", description = "USER")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "유저 정보 가져오기 성공"),
            @ApiResponse(responseCode = "510", description = "존재하지 않음")
    })
    @PostMapping("/userInfo")
    public ResponseEntity<?> getUserInfo(@RequestBody String email){
        User user = userService.getUserInfo(email);
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "아이 정보 가져오기 (타 마이크로서비스 아이 정보 가져오기)", description = "USER")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이 정보 가져오기 성공"),
            @ApiResponse(responseCode = "510", description = "존재하지 않음")
    })
    @PostMapping("/child-info")
    public ResponseEntity<?> getChildInfo(@RequestBody GetChildInfoRequestDTO getChildInfoRequestDTO){
        GetChildInfoResponseDTO getChildInfoResponseDTO = userService.getChildInfo(getChildInfoRequestDTO.getEmail());
        return ResponseEntity.ok(getChildInfoResponseDTO);
    }
}
