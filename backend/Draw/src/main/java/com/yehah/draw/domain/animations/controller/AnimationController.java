package com.yehah.draw.domain.animations.controller;

import com.yehah.draw.domain.animations.dto.request.AnimationAnimalReqDto;
import com.yehah.draw.domain.animations.dto.response.AnimationAnimalResDto;
import com.yehah.draw.domain.animations.exception.AnimationChangeException;
import com.yehah.draw.global.communication.CommMethod;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/animations")
public class AnimationController {

    @Value("${micro.path.animate}")
    private String animatePath;

    private final CommMethod commMethod;

    // NOTE : animals와 friendsAnimal 모두 받아온다.
    @PostMapping("/animals")
    public ResponseEntity<AnimationAnimalResDto> sendAnimatedAnimal(@ModelAttribute AnimationAnimalReqDto animationAnimalReqDto) throws IOException {
        MultiValueMap<String, Object> bodyData = new LinkedMultiValueMap<>();
        bodyData.add("image", animationAnimalReqDto.getImage().getResource());
        bodyData.add("animalType", animationAnimalReqDto.getAnimalType());

//        try{
//            return ResponseEntity.ok().body(AnimationAnimalResDto.builder()
//                    .gifImage(commMethod.postMultipartAnimateMethod(bodyData, animatePath)).build());
//        }catch(Exception e){
//            throw new AnimationChangeException("이미지를 GIF를 변환할 수 없습니다.");
//        }

        commMethod.postMultipartAnimateMethod(bodyData, animatePath);

        return null;

    }

}
