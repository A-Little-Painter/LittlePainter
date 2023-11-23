package com.yehah.draw.domain.tale.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yehah.draw.domain.tale.dto.response.TaleListResDto;
import com.yehah.draw.domain.tale.entity.Tale;
import com.yehah.draw.domain.tale.repository.TaleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaleServiceImpl implements TaleService{

	private final TaleRepository taleRepository;

	@Transactional(readOnly = true)
	public Slice<TaleListResDto> getTaleList(int page){
		PageRequest pageRequest = PageRequest.of(page, 24, Sort.by(Sort.Direction.ASC, "id"));
		Slice<Tale> talePage = taleRepository.findSliceBy(pageRequest);

		return talePage.map(tale -> {
			return TaleListResDto.builder()
				.id(tale.getId())
				.title(tale.getTitle())
				.urlCover(tale.getUrlCover())
				.isAvailable(tale.getMaxPage() > 1)
				.build();
		});
	}

}
