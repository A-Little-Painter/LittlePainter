package com.yehah.draw.domain.tale.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


@Data
@NoArgsConstructor
public class TaleSimilarReqDto {
    private String roomId;
    private MultipartFile originalFile;
    private MultipartFile newFile;
}
