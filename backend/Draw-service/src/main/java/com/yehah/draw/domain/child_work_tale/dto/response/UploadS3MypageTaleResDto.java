package com.yehah.draw.domain.child_work_tale.dto.response;

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
public class UploadS3MypageTaleResDto {
	Long talePageId;
	String imageFileUrl;
	String gifFileUrl;
}
