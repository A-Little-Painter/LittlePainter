package com.yehah.draw.domain.friends_animal.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class FriendsAnimalUploadReqDto {
    private Long friendsAnimalId;
    private MultipartFile file;
}
