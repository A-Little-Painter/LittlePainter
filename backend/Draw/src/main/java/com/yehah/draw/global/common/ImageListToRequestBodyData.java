package com.yehah.draw.global.common;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;

public class ImageListToRequestBodyData {
    public static void addImage(Map<String, byte[]> images, MultiValueMap<String, Object> bodyData) {
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
