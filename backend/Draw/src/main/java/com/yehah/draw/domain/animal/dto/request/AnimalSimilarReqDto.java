package com.yehah.draw.domain.animal.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


@Data
@NoArgsConstructor
public class AnimalSimilarReqDto {
    private String roomId;
    private MultipartFile originalFile;
    private MultipartFile newFile;
}
