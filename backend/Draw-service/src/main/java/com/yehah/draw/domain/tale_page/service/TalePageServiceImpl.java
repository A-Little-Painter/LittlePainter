package com.yehah.draw.domain.tale_page.service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.yehah.draw.domain.tale_page.dto.response.GetTaleCharacterResDto;
import com.yehah.draw.domain.tale_page.dto.response.GetTalePagesResDto;
import com.yehah.draw.domain.tale_page.entity.TalePage;
import com.yehah.draw.domain.tale_page.repository.TalePageRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class TalePageServiceImpl implements TalePageService {

	private final TalePageRepository talePageRepository;

	public List<GetTalePagesResDto> getTalePages(Long taleId){
		List<TalePage> talePageList = talePageRepository.findByTaleId(taleId);
		List<GetTalePagesResDto> result =  talePageList.stream()
			.map(talePage -> {
				int index = 0;
				Boolean flag = false;
				List<GetTaleCharacterResDto> characterResDtoList = talePage.getTaleCharacters().stream()
					.map(taleCharacter -> {
						GetTaleCharacterResDto characterResDto = GetTaleCharacterResDto.builder()
							.taleCharacterid(taleCharacter.getId())
							.characterName(taleCharacter.getCharacterName())
							.urlOriginal(taleCharacter.getUrlOriginal())
							.urlGif(taleCharacter.getUrlGif())
							.urlTrace(taleCharacter.getUrlTrace())
							.movement(taleCharacter.getMovement())
							.startX(taleCharacter.getStartX())
							.startY(taleCharacter.getStartY())
							.endX(taleCharacter.getEndX())
							.endY(taleCharacter.getEndY())
							.build();

						return characterResDto;
					})
					.collect(Collectors.toList());


				// characterResDtoList 중에서 characterName이 null이 아닌 요소를 [0]번째로 위치하도록 조정합니다.
				if (talePage.getDrawing()) {
					characterResDtoList.sort(Comparator.comparing(c -> c.getUrlTrace() == null));
				}

				return GetTalePagesResDto.builder()
					.talePageId(talePage.getId())
					.pageNum(talePage.getPageNumber())
					.urlBackground(talePage.getUrlBackground())
					.urlSound(talePage.getUrlSound())
					.narration(talePage.getNarration())
					.drawing(talePage.getDrawing())
					.characters(characterResDtoList)
					.build();
			})
			.collect(Collectors.toList());

		return result;
	}

}
