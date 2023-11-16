package com.yehah.draw.domain.animations.controller;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.yehah.draw.domain.animal.service.AnimalService;
import com.yehah.draw.domain.animations.dto.request.AnimationFriendReqDto;
import com.yehah.draw.domain.animations.dto.request.FriendReqDto;
import com.yehah.draw.domain.animations.dto.response.FriendResDto;
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

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/animations")
public class AnimationController {

    private final ImageAndGifProcessor imageAndGifProcessor;

    private final AnimalService animalService;

    @PostMapping("/animals")
    public ResponseEntity<AnimationResDto> sendAnimatedAnimal(@ModelAttribute AnimationAnimalReqDto animationAnimalReqDto) throws IOException {
        byte[] imageFile, gifFile;

        // 1. 테두리의 영역 안에 있는 이미지만 추출하기
        imageFile = imageAndGifProcessor.extractBorderImage(animationAnimalReqDto.getRoomId(), animationAnimalReqDto.getOriginalFile(),
                animationAnimalReqDto.getNewFile());
        // 2. gif파일 받아오기
        gifFile = imageAndGifProcessor.animalConvertToGif(animationAnimalReqDto.getAnimalType(), imageFile);
        // 3. image, gif 파일 모두 업로드하기
        AnimationResDto animationResDto = imageAndGifProcessor.uploadsImageAndGif(imageFile, gifFile);
        animationResDto.setUrlSound(animalService.getAnimalUrlSound(animationAnimalReqDto.getAnimalType()));

        return ResponseEntity.ok(animationResDto);
    }

    @PostMapping("/tales")
    public ResponseEntity<AnimationResDto> sendAnimatedTale(@ModelAttribute AnimationTaleReqDto animationTaleReqDto) throws JsonMappingException {
        byte[] imageFile, gifFile;

        imageFile = imageAndGifProcessor.extractBorderImage(animationTaleReqDto.getRoomId(), animationTaleReqDto.getOriginalFile(),
                animationTaleReqDto.getNewFile());
        gifFile = imageAndGifProcessor.taleConvertToGif(animationTaleReqDto.getPageNumber(), animationTaleReqDto.getTitle(),
                animationTaleReqDto.getRequestCharacter(), imageFile);
        return ResponseEntity.ok(imageAndGifProcessor.uploadsImageAndGif(imageFile, gifFile));
    }

    @PostMapping("/friends")
    public ResponseEntity<AnimationResDto> sendAnimatedFriends(@ModelAttribute AnimationFriendReqDto animationFriendReqDto) throws JsonMappingException {
        byte[] imageFile, gifFile;

        imageFile = imageAndGifProcessor.extractBorderImage(animationFriendReqDto.getRoomId(), animationFriendReqDto.getOriginalFile(),
                animationFriendReqDto.getNewFile());
        gifFile = imageAndGifProcessor.friendConvertToGif(imageFile);
        return ResponseEntity.ok(imageAndGifProcessor.uploadsImageAndGif(imageFile, gifFile));
    }

    @PostMapping("/friends-animal")
    public ResponseEntity<String> saveFriendsAnimal(@ModelAttribute FriendReqDto friendReqDto) throws JsonMappingException {
        byte[] imageFile;

        UUID uuid = UUID.randomUUID();
        // 1. 테두리의 영역 안에 있는 이미지만 추출하기
        imageFile = imageAndGifProcessor.extractBorderImage(uuid.toString(), friendReqDto.getOriginalFile(),
                friendReqDto.getNewFile());
        return ResponseEntity.ok(imageAndGifProcessor.uploadsImage(imageFile).getImageUrl());
    }

}
