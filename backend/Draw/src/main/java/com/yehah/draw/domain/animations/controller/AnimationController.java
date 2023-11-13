package com.yehah.draw.domain.animations.controller;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.yehah.draw.domain.animations.dto.request.AnimationFriendReqDto;
import com.yehah.draw.global.Processor.ImageAndGifProcessor;
import com.yehah.draw.domain.animations.dto.request.AnimationAnimalReqDto;
import com.yehah.draw.domain.animations.dto.request.AnimationTaleReqDto;
import com.yehah.draw.domain.animations.dto.response.AnimationResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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

    private final ImageAndGifProcessor imageAndGifProcessor;
    private byte[] imageFile, gifFile;

    // NOTE : animals와 friendsAnimal 모두 받아온다.
    @PostMapping("/animals")
    public ResponseEntity<AnimationResDto> sendAnimatedAnimal(@ModelAttribute AnimationAnimalReqDto animationAnimalReqDto) throws IOException {
        // 1. 테두리의 영역 안에 있는 이미지만 추출하기
        try{
            imageFile = imageAndGifProcessor.extractBorderImage(animationAnimalReqDto.getRoomId(), animationAnimalReqDto.getOriginalFile(),
                    animationAnimalReqDto.getNewFile());
            // 2. gif파일 받아오기
            gifFile = imageAndGifProcessor.animalConvertToGif(animationAnimalReqDto.getAnimalType(), imageFile);
            // 3. image, gif 파일 모두 업로드하기
            return ResponseEntity.ok(imageAndGifProcessor.uploadsImageAndGif(imageFile, gifFile));
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping("/tales")
    public ResponseEntity<AnimationResDto> sendAnimatedTale(@ModelAttribute AnimationTaleReqDto animationTaleReqDto) throws JsonMappingException {
        imageFile = imageAndGifProcessor.extractBorderImage(animationTaleReqDto.getRoomId(), animationTaleReqDto.getOriginalFile(),
                animationTaleReqDto.getNewFile());
        gifFile = imageAndGifProcessor.taleConvertToGif(animationTaleReqDto.getPageNumber(), animationTaleReqDto.getTitle(),
                animationTaleReqDto.getRequestCharacter(), imageFile);
        return ResponseEntity.ok(imageAndGifProcessor.uploadsImageAndGif(imageFile, gifFile));
    }

    @PostMapping("/friends")
    public ResponseEntity<AnimationResDto> sendAnimatedFriends(@ModelAttribute AnimationFriendReqDto animationFriendReqDto) throws JsonMappingException {
        imageFile = imageAndGifProcessor.extractBorderImage(animationFriendReqDto.getRoomId(), animationFriendReqDto.getOriginalFile(),
                animationFriendReqDto.getNewFile());
        gifFile = imageAndGifProcessor.friendConvertToGif(imageFile);
        return ResponseEntity.ok(imageAndGifProcessor.uploadsImageAndGif(imageFile, gifFile));
    }

}
