package com.yehah.draw.domain.child_work.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SaveS3ChildWorkReqDto {
	Long userId;
	String category;
	String imageUrl;
	String gifUrl;
}
