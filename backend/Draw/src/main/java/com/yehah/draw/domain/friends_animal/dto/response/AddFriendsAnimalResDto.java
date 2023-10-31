package com.yehah.draw.domain.friends_animal.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AddFriendsAnimalResDto {
	String originalUrl;
	String traceUrl;
}
