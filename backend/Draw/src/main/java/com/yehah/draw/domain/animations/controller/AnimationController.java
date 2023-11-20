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
import com.yehah.draw.global.common.ZipExtractor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/animations")
public class AnimationController {

    private final ImageAndGifProcessor imageAndGifProcessor;

    private final AnimalService animalService;

    // NOTE : 동물 그리기
    @PostMapping("/animals")
    public ResponseEntity<AnimationResDto> sendAnimatedAnimal(@ModelAttribute AnimationAnimalReqDto animationAnimalReqDto) throws IOException {
        byte[] imageZip, gifFile;

        // 1. 테두리의 영역 안에 있는 이미지만 추출하기
        imageZip = imageAndGifProcessor.extractBorderImage(animationAnimalReqDto.getRoomId(), animationAnimalReqDto.getOriginalFile(),
                animationAnimalReqDto.getNewFile());
        List<byte[]> images = ZipExtractor.unzip(imageZip);

        // 2. gif파일 받아오기
        gifFile = imageAndGifProcessor.animalConvertToGif(animationAnimalReqDto.getAnimalType(), images);
        // 3. image, gif 파일 모두 업로드하기
        AnimationResDto animationResDto = imageAndGifProcessor.uploadsImageAndGif(images.get(0), gifFile);
        animationResDto.setUrlSound(animalService.getAnimalUrlSound(animationAnimalReqDto.getAnimalType()));

        return ResponseEntity.ok(animationResDto);
    }

    // NOTE : 동화 그리기
    @PostMapping("/tales")
    public ResponseEntity<AnimationResDto> sendAnimatedTale(@ModelAttribute AnimationTaleReqDto animationTaleReqDto) throws IOException {
        byte[] imageZip, gifFile;

        imageZip = imageAndGifProcessor.extractBorderImage(animationTaleReqDto.getRoomId(), animationTaleReqDto.getOriginalFile(),
                animationTaleReqDto.getNewFile());
        List<byte[]> images = ZipExtractor.unzip(imageZip);

        gifFile = imageAndGifProcessor.taleConvertToGif(animationTaleReqDto.getPageNumber(), animationTaleReqDto.getTitle(),
                animationTaleReqDto.getRequestCharacter(), images);
        return ResponseEntity.ok(imageAndGifProcessor.uploadsImageAndGif(images.get(0), gifFile));
    }

    // NOTE : 내 친구 그리기
    @PostMapping("/friends")
    public ResponseEntity<AnimationResDto> sendAnimatedFriends(@ModelAttribute AnimationFriendReqDto animationFriendReqDto) throws IOException {
        byte[] imageZip, gifFile;

        imageZip = imageAndGifProcessor.extractBorderImage(animationFriendReqDto.getRoomId(), animationFriendReqDto.getOriginalFile(),
                animationFriendReqDto.getNewFile());
        List<byte[]> images = ZipExtractor.unzip(imageZip);

        gifFile = imageAndGifProcessor.friendConvertToGif(images);
        return ResponseEntity.ok(imageAndGifProcessor.uploadsImageAndGif(images.get(0), gifFile));
    }

    // NOTE : 내 친구의 동물 그리기
    @PostMapping("/friends-animal")
    public ResponseEntity<String> saveFriendsAnimal(@ModelAttribute FriendReqDto friendReqDto) throws IOException {
        byte[] imageZip;

        UUID uuid = UUID.randomUUID();
        // 1. 테두리의 영역 안에 있는 이미지만 추출하기
        imageZip = imageAndGifProcessor.extractBorderImage(uuid.toString(), friendReqDto.getOriginalFile(),
                friendReqDto.getNewFile());
        List<byte[]> images = ZipExtractor.unzip(imageZip);

        return ResponseEntity.ok(imageAndGifProcessor.uploadsImage(images.get(0)).getImageUrl());
    }

}
