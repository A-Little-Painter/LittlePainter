package com.yehah.draw.domain.friends_animal.dto.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddFriendsAnimalReqDto {
	private Long animalTypeId;
	private String title;
	private String detail;
	private Boolean movable;
	private String originalUrl;
	private String traceUrl;
}
