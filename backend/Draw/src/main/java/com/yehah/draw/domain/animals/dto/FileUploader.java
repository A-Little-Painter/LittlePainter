package com.yehah.draw.domain.animals.dto;

import com.yehah.draw.domain.animals.entity.Picture;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@AllArgsConstructor
public class FileUploader {
    public void uploadFile(Picture picture) throws IOException {
        // Picture
        String absolutePath = new File("").getAbsolutePath() + "\\";

        String path = "images/" + picture.getSessionId();

        File file = new File(path);

        if(!file.exists()){
            file.mkdirs();
        }

        MultipartFile multipartFile = picture.getMultipartFile();
        if(!multipartFile.isEmpty()){
            String contentType = multipartFile.getContentType();
            String fileExtension;

            if(!ObjectUtils.isEmpty(contentType)){
                if(contentType.contains("image/jpeg")){
                    fileExtension = ".jpg";
                }
                else if(contentType.contains("image/png")){
                    fileExtension = ".png";
                }
                else if(contentType.contains("image/gif")){
                    fileExtension = ".gif";
                }
            }

            file = new File(absolutePath + path + "/" + picture.getSessionId());
            multipartFile.transferTo(file);
        }
    }
}
