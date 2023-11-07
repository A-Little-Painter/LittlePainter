package com.yehah.draw.domain.child_work_tale.dto.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddChildWorkTaleReqDto {
	private Long pageId;
	private String gifUrl;
	private MultipartFile imageFile;
}
