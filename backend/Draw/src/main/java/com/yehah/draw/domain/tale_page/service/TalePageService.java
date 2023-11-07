package com.yehah.draw.domain.tale_page.service;

import java.util.List;

import com.yehah.draw.domain.tale_page.dto.response.TalePageResDto;

public interface TalePageService {
	public List<TalePageResDto> getTalePages(Long taleId);
}
