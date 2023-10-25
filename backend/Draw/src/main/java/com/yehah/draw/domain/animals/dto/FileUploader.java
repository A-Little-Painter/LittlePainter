package com.yehah.draw.domain.animals.dto;

import com.yehah.draw.domain.animals.entity.Picture;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Slf4j
@Data
@Configuration
@NoArgsConstructor
public class FileUploader {
    public void uploadFile(String sessionId, MultipartFile originalFile, MultipartFile newFile) throws IOException {

        String absolutePath = new File("").getAbsolutePath() + "\\";

        // NOTE : 새로운 폴더를 생성한다.
        String originalPath = "images/original/";
        String newPath = "images/new/";

        File makeOriginalFile = makeFile(originalPath);
        File makeNewFile = makeFile(newPath);

        originalPath += sessionId;
        newPath += sessionId;

        String originalExtension, newExtension;
        if(!originalFile.isEmpty() && !newFile.isEmpty()){

            originalExtension = getExtension(originalFile); // NOTE : 파일의 확장자를 가져온다.

            if(!originalExtension.equals(null)){
                originalPath += originalExtension;
                log.info("PATH : "+ originalExtension);
                makeOriginalFile = new File(absolutePath + originalPath);
                if(makeOriginalFile.exists()){ // NOTE : 기존에 받은 파일이 있다면 지우고 다시 만든다.
                    makeOriginalFile.delete();
                }
                originalFile.transferTo(makeOriginalFile);
            }


            newExtension = getExtension(newFile);

            if(!newExtension.equals(null)) {
                newPath += newExtension;
                log.info("PATH : "+ newPath);
                makeNewFile = new File(absolutePath + newPath);
                if(makeNewFile.exists()){
                    makeNewFile.delete();
                }
                newFile.transferTo(makeNewFile);
            }

        }
    }

    public File makeFile(String path){
        File file = new File(path);
        if(!file.exists()){
            file.mkdirs();
        }
        return file;
    }

    public String getExtension(MultipartFile multipartFile){
        String contentType = multipartFile.getContentType();
        String fileExtension = null;

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
        return fileExtension;
    }
}
