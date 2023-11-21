package com.yehah.draw.global.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;

@Slf4j
public class ImageListToRequestBodyData {
    public static void addImage(Map<String, byte[]> images, MultiValueMap<String, Object> bodyData) {
        log.error("images 사이즈 = " + images.size());
        if(images.size() < 2) {
            System.out.println("images 사이즈 2보다 작음" + images.size());
            log.error("images 사이즈 2보다 작음" + images.size());
        }
        bodyData.add("image_mask", new ByteArrayResource(images.get("output_mask.jpg")){
            @Override
            public String getFilename() throws IllegalStateException{
                return "image_mask.jpg";
            }
        });

        bodyData.add("image", new ByteArrayResource(images.get("output.jpg")){
            @Override
            public String getFilename() throws IllegalStateException{
                return "image.jpg";
            }
        });
    }
}
