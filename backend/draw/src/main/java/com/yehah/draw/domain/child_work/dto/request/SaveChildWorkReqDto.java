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
public class SaveChildWorkReqDto {
	Long workId;
	String imageUrl;
	String gifUrl;
}
