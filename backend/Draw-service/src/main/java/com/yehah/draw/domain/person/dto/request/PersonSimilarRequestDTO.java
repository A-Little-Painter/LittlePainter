package com.yehah.draw.domain.person.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class PersonSimilarRequestDTO {
    private String roomId;
    private MultipartFile originalFile;
    private MultipartFile newFile;
}
