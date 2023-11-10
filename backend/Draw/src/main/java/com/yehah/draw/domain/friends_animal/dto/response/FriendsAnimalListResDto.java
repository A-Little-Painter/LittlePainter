package com.yehah.draw.domain.friends_animal.dto.response;

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
public class FriendsAnimalListResDto {
	private Long friendsAnimalId;
	private String userEmail;
	private String title;
	private String originalImageUrl;	//동물 누끼 이미지
	private String animalType;
}
