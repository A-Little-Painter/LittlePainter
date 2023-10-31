package com.yehah.draw.domain.friends_animal.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FriendsAnimalResDto {
	private Long friendsAnimalId;
	private Long animalTypeId;
	private String animalTypeName;
	private String userEmail;
	private String title;
	private String detail;
	private String originalImageUrl;
	private String traceImageUrl;
	private boolean movable;
}
