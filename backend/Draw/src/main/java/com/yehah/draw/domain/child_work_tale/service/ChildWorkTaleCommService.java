package com.yehah.draw.domain.child_work_tale.service;

import java.util.List;

import com.yehah.draw.domain.child_work_tale.dto.request.AddChildWorkTaleReqDto;
import com.yehah.draw.domain.child_work_tale.dto.response.UploadS3MypageTaleResDto;

import reactor.core.publisher.Mono;

public interface ChildWorkTaleCommService {
	public Mono<List<UploadS3MypageTaleResDto>> postS3MyPage(List<AddChildWorkTaleReqDto> addChildWorkTaleReqDtoList);
}
