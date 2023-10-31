package com.yehah.draw.domain.friends_animal.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FriendsAnimalListResponse {
	private Long friendsAnimalId;
	private String userEmail;
	private String title;
	private String originalImageUrl;
}
