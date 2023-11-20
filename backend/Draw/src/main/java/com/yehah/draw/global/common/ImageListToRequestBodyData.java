package com.yehah.draw.global.common;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.util.MultiValueMap;

import java.util.List;

public class ImageListToRequestBodyData {
    public static void addImage(List<byte[]> images, MultiValueMap<String, Object> bodyData) {
        bodyData.add("image", new ByteArrayResource(images.get(0)){
            @Override
            public String getFilename() throws IllegalStateException{
                return "image.jpg";
            }
        });

        bodyData.add("image_mask", new ByteArrayResource(images.get(1)){
            @Override
            public String getFilename() throws IllegalStateException{
                return "image_mask.jpg";
            }
        });
    }
}
