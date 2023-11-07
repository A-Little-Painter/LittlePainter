package com.yehah.draw.domain.tale_page.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.yehah.draw.domain.tale_page.dto.response.TalePageResDto;
import com.yehah.draw.domain.tale_page.repository.TalePageRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class TalePageServiceImpl implements TalePageService {

	private final TalePageRepository talePageRepository;

	public List<TalePageResDto> getTalePages(Long taleId){
		return talePageRepository.findByTaleId(taleId);
	}

}
