package com.yehah.draw.domain.tale.controller;

import com.yehah.draw.domain.animal.dto.request.AnimalSimilarReqDto;
import com.yehah.draw.domain.animal.dto.response.AnimalSimilarResDto;
import com.yehah.draw.domain.animal.entity.SimilarState;
import com.yehah.draw.domain.animal.exception.SimilarityCheckException;
import com.yehah.draw.domain.tale.dto.request.TaleSimilarReqDto;
import com.yehah.draw.domain.tale.dto.response.TaleSimilarResDto;
import com.yehah.draw.global.common.AnimalType;
import com.yehah.draw.global.communication.CommMethod;
import com.yehah.draw.global.stomp.ResponseState;
import com.yehah.draw.global.stomp.StompService;
import com.yehah.draw.global.stomp.dto.MessageResponse;
import com.yehah.draw.global.stomp.dto.SimilarMessageResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import com.yehah.draw.domain.tale.dto.response.TaleListResDto;
import com.yehah.draw.domain.tale.service.TaleService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/tales")
public class TaleController {

	@Value("${micro.path.similarityCheck}")
	private String similarityPath;

	private final TaleService taleService;

	private final StompService stompService;

	private final CommMethod commMethod;

	@Operation(summary = "동화 전체 목록을 조회", description = "친구의 동물 전체 목록을 페이징 처리하여 리턴한다.")
	@GetMapping("")
	public ResponseEntity<Slice<TaleListResDto>> getFriendsAnimalList(@RequestParam(value = "page", defaultValue = "0") int page){
		log.debug("getFriendsAnimals() : page = {}, ", page);
		return ResponseEntity.ok(taleService.getTaleList(page));
	}


	@Operation(summary = "동화의 유사도를 확인한다.", description = "ALL")
	@PostMapping("/similarcheck")
	public ResponseEntity<TaleSimilarResDto> taleSimilarCheck(@ModelAttribute TaleSimilarReqDto taleSimilarReqDto) throws IOException {
		MultiValueMap<String, Object> bodyData = new LinkedMultiValueMap<>();

		bodyData.add("roomId", taleSimilarReqDto.getRoomId());
		bodyData.add("originalFile", taleSimilarReqDto.getOriginalFile().getResource());
		bodyData.add("newFile", taleSimilarReqDto.getNewFile().getResource());

		String stompUrl = "/sub/room/"+taleSimilarReqDto.getRoomId();

		try{
			double value = Double.parseDouble(String.valueOf(commMethod.postMultipartMethod(bodyData, similarityPath+"/similarcheck")));
			log.info("-----유사도-----> "+value);

			// NOTE : STOMP 연결하기
			SimilarMessageResponse similarMessageResponse = SimilarMessageResponse.builder()
					.roomId(taleSimilarReqDto.getRoomId())
					.animalType(AnimalType.tale)
					.similarValue(value)
					.responseState(ResponseState.SUCCESS)
					.message("유사도 연결에 성공하셨습니다.")
					.build();

			if(value >= 0.19){
				// NOTE : STOMP 응답 전송하기
				stompService.AnimalSuccessRes(stompUrl, SimilarState.END, similarMessageResponse);
				return ResponseEntity.ok(TaleSimilarResDto.builder()
						.similarValue(value)
						.similarState(SimilarState.END).build()); // 계속 유사도를 끝낸다.
			}else{
				// NOTE : STOMP 응답 전송하기
				stompService.AnimalSuccessRes(stompUrl, SimilarState.CONTINUE, similarMessageResponse);
				return ResponseEntity.ok(TaleSimilarResDto.builder()
						.similarValue(value)
						.similarState(SimilarState.CONTINUE).build()); // 계속 유사도를 멈춘다.
			}
		}catch(Exception e){
			e.printStackTrace();
			// NOTE : STOMP 응답 전송하기
			stompService.AnimalFailRes(stompUrl, MessageResponse.builder()
					.roomId(taleSimilarReqDto.getRoomId())
					.animalType(AnimalType.tale)
					.message("유사도 측정에 실패했습니다.").responseState(ResponseState.FAIL).build());

			throw new SimilarityCheckException("유사도 측정에 실패했습니다.");
		}
	}

}
