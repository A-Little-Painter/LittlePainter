package com.yehah.draw.domain.detection.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class UploadAnimalsRequestDTO {
    private MultipartFile file;
}
