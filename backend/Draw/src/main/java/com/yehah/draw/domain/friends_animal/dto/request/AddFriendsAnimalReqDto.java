package com.yehah.draw.domain.friends_animal.dto.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AddFriendsAnimalReqDto {
	private Long animalTypeId;
	private String title;
	private String detail;
	private Boolean movable;
}
