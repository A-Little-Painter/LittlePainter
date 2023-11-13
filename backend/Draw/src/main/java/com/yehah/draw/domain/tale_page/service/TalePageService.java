package com.yehah.draw.domain.tale_page.service;

import java.util.List;

import com.yehah.draw.domain.tale_page.dto.response.GetTalePagesResDto;

public interface TalePageService {
	public List<GetTalePagesResDto> getTalePages(Long taleId);
}
