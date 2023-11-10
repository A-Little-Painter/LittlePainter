package com.yehah.draw.domain.animations.controller;

import com.yehah.draw.domain.animations.dto.request.AnimationAnimalReqDto;
import com.yehah.draw.domain.animations.dto.request.AnimationTaleReqDto;
import com.yehah.draw.domain.animations.dto.response.AnimationResDto;
import com.yehah.draw.domain.animations.exception.AnimationChangeException;
import com.yehah.draw.global.communication.CommMethod;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
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

    @Value("${micro.path.image}")
    private String imagePath;

    private final CommMethod commMethod;
    private MultiValueMap<String, Object> bodyData;

    // NOTE : animals와 friendsAnimal 모두 받아온다.
    @PostMapping("/animals")
    public ResponseEntity<AnimationResDto> sendAnimatedAnimal(@ModelAttribute AnimationAnimalReqDto animationAnimalReqDto) throws IOException {
        bodyData = new LinkedMultiValueMap<>();
        bodyData.add("animalType", animationAnimalReqDto.getAnimalType());
        bodyData.add("image", animationAnimalReqDto.getImage().getResource());

        try{
            //byte[] gifImage = commMethod.postMultipartAnimateMethod(bodyData, animatePath+"/animals");

            byte[] gifImage = commMethod.postMultipartAnimateMethod(bodyData, animatePath+"/test-dance");
            bodyData.clear();
            bodyData.add("gifFile", new ByteArrayResource(gifImage){
                @Override
                public String getFilename() throws IllegalStateException {
                    return "gifFile.gif";
                }
            });

            String gifImageUrl = String.valueOf(commMethod.postMultipartMethod(bodyData, imagePath+"/comm/temp"));

            return ResponseEntity.ok().body(AnimationResDto.builder()
                    .gifImageUrl(gifImageUrl).build());
        }catch(Exception e){
            e.printStackTrace();
            throw new AnimationChangeException("이미지를 GIF로 변환할 수 없습니다.");
        }

    }

    @PostMapping("/tales")
    public ResponseEntity<AnimationResDto> sendAnimatedTale(@ModelAttribute AnimationTaleReqDto animationTaleReqDto){
        bodyData = new LinkedMultiValueMap<>();
        bodyData.add("pageNo", animationTaleReqDto.getPageNumber());
        bodyData.add("taleTitle", animationTaleReqDto.getTitle());
        bodyData.add("character", animationTaleReqDto.getRequestCharacter());
        bodyData.add("image", animationTaleReqDto.getImage().getResource());

        try{
            log.info(animatePath+"/tales");
            //byte[] gifImage = commMethod.postMultipartAnimateMethod(bodyData, animatePath+"/tales");
            byte[] gifImage = commMethod.postMultipartAnimateMethod(bodyData, animatePath+"/test-dance");

            bodyData.clear();
            bodyData.add("gifFile", new ByteArrayResource(gifImage){
                @Override
                public String getFilename() throws IllegalStateException {
                    return "gifFile.gif";
                }
            });

            String gifImageUrl = String.valueOf(commMethod.postMultipartMethod(bodyData, imagePath+"/comm/temp"));

            return ResponseEntity.ok().body(AnimationResDto.builder()
                    .gifImageUrl(gifImageUrl).build());

        } catch (Exception e) {
            e.printStackTrace();
            throw new AnimationChangeException("이미지를 GIF로 변환할 수 없습니다.");
        }
    }

}
