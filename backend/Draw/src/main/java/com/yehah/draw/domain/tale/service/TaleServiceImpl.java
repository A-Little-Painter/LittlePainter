package com.yehah.draw.domain.tale.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yehah.draw.domain.tale.dto.response.TaleListResDto;
import com.yehah.draw.domain.tale.repository.TaleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaleServiceImpl implements TaleService{

	private final TaleRepository taleRepository;

	@Transactional(readOnly = true)
	public Slice<TaleListResDto> getTaleList(int page){
		PageRequest pageRequest = PageRequest.of(page, 24, Sort.by(Sort.Direction.DESC, "id"));
		return taleRepository.findSliceBy(pageRequest);
	}

}
