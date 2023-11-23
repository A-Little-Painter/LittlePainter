package com.yehah.draw.domain.animal.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class AnimalUploadReqDto {
    private Long animalId;
    private MultipartFile file;
}
