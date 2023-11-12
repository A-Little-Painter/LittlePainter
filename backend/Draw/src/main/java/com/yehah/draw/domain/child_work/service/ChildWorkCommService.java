package com.yehah.draw.domain.child_work.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.yehah.draw.domain.child_work.dto.response.UploadS3MypageResDto;

import reactor.core.publisher.Mono;

public interface ChildWorkCommService {
	public Mono<UploadS3MypageResDto> postS3MyPage(String category, Long childId, String imageUrl, String gifUrl);
}
