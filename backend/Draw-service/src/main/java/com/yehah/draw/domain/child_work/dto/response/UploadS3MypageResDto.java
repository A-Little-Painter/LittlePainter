package com.yehah.draw.domain.child_work.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UploadS3MypageResDto {
	String imageFileUrl;
	String gifFileUrl;
}
