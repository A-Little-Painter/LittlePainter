package com.yehah.draw.domain.tale.service;

import org.springframework.data.domain.Slice;

import com.yehah.draw.domain.tale.dto.response.TaleListResDto;

public interface TaleService {
	public Slice<TaleListResDto> getTaleList(int page);
}
