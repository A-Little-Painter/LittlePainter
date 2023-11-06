package com.yehah.draw.domain.friends_animal.controller;

import com.yehah.draw.domain.animal.dto.request.AnimalSimilarReqDto;
import com.yehah.draw.domain.animal.dto.response.AnimalChoiceResDto;
import com.yehah.draw.domain.animal.dto.response.AnimalSimilarResDto;
import com.yehah.draw.domain.animal.entity.SimilarState;
import com.yehah.draw.domain.animal.exception.SaveImageException;
import com.yehah.draw.domain.animal.exception.SimilarityCheckException;
import com.yehah.draw.domain.child_work.service.ChildWorkService;
import com.yehah.draw.domain.friends_animal.dto.request.FriendsAnimalUploadReqDto;
import com.yehah.draw.global.common.AnimalType;
import com.yehah.draw.global.communication.CommMethod;
import com.yehah.draw.global.stomp.ResponseState;
import com.yehah.draw.global.stomp.StompService;
import com.yehah.draw.global.stomp.dto.MessageResponse;
import com.yehah.draw.global.stomp.dto.SimilarMessageResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Slice;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.yehah.draw.domain.friends_animal.dto.request.AddFriendsAnimalReqDto;
import com.yehah.draw.domain.friends_animal.dto.response.FriendsAnimalListResDto;
import com.yehah.draw.domain.friends_animal.service.FriendsAnimalCommService;
import com.yehah.draw.domain.friends_animal.service.FriendsAnimalService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/friends")
public class FriendsAnimalController {

	@Value("${micro.path.similarityCheck}")
	private String similarityUrl;

	@Value("${micro.path.image}")
	private String imageUrl;

	private final FriendsAnimalService friendsAnimalService;
	private final FriendsAnimalCommService friendsAnimalCommService;
	private final ChildWorkService childWorkService;
	private final StompService stompService;
	private final CommMethod commMethod;

	@Operation(summary = "친구의 동물 전체 목록을 조회", description = "친구의 동물 전체 목록을 페이징 처리하여 리턴한다.")
	@GetMapping("")
	public ResponseEntity<Slice<FriendsAnimalListResDto>> getFriendsAnimalList(@RequestParam(name = "animalTypeId", defaultValue = "0") Long animalTypeId, @RequestParam(value = "page", defaultValue = "0") int page){
		log.debug("getFriendsAnimalList() : animalTypeId = {}, page = {}, ", animalTypeId, page);
		return ResponseEntity.ok(friendsAnimalService.getFriendsAnimalList(animalTypeId, page));
	}

	@Operation(summary = "내 동물 사진 업로드", description = "(최종버전)나의 동물 사진을 업로드한다.")
	@PostMapping(name = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Long> addMyAnimalImage(@RequestPart(value="originalImage") MultipartFile originalImage,
		@RequestPart(value="traceImage") MultipartFile traceImage, @RequestPart(value = "addFriendsAnimalReqDto") AddFriendsAnimalReqDto addFriendsAnimalReqDto){
		log.debug("addMyAnimalImage() : ");
		return ResponseEntity.ok(friendsAnimalCommService.addMyAnimalImage(originalImage, traceImage, addFriendsAnimalReqDto));
	}


	@Operation(summary = "선택한 친구의 동물 테두리 사진과 설명을 가져온다.", description = "ALL")
	@GetMapping("/{friendsAnimalId}")
	public ResponseEntity<AnimalChoiceResDto> getTraceUrl(@PathVariable(name = "friendsAnimalId")Long friendsAnimalId){
		return ResponseEntity.ok(friendsAnimalService.getAnimalChoiceData(friendsAnimalId));
	}

	@Operation(summary = "친구 동물의 유사도를 확인한다.", description = "ALL")
	@PostMapping("/similarcheck")
	public ResponseEntity<AnimalSimilarResDto> friendsAnimalSimilarCheck(@ModelAttribute AnimalSimilarReqDto animalSimilarReqDto) throws IOException {
		MultiValueMap<String, Object> bodyData = new LinkedMultiValueMap<>();

		// NOTE : 이미지의 유사도를 확인한다.
		bodyData.add("sessionId", animalSimilarReqDto.getRoomId()); // 세션 아이디 전송
		bodyData.add("originalFile", animalSimilarReqDto.getOriginalFile().getResource());
		bodyData.add("newFile", animalSimilarReqDto.getNewFile().getResource());

		String stompUrl = "/sub/room/"+animalSimilarReqDto.getRoomId();

		try{
			double value = Double.parseDouble(commMethod.postMultipartMethod(bodyData, similarityUrl));
			log.info("-----유사도-----> "+value);

			// NOTE : STOMP 연결하기
			SimilarMessageResponse similarMessageResponse = SimilarMessageResponse.builder()
					.roomId(animalSimilarReqDto.getRoomId())
					.animalType(AnimalType.friendsAnimal)
					.similarValue(value)
					.responseState(ResponseState.SUCCESS)
					.message("유사도 연결에 성공하셨습니다.")
					.build();

			if(value >= 0.4){
				// NOTE : STOMP 응답 전송하기
				stompService.AnimalSuccessRes(stompUrl, SimilarState.END, similarMessageResponse);
				return ResponseEntity.ok(AnimalSimilarResDto.builder()
						.similarValue(value)
						.similarState(SimilarState.END).build()); // 계속 유사도를 끝낸다.
			}else{
				// NOTE : STOMP 응답 전송하기
				stompService.AnimalSuccessRes(stompUrl, SimilarState.CONTINUE, similarMessageResponse);
				return ResponseEntity.ok(AnimalSimilarResDto.builder()
						.similarValue(value)
						.similarState(SimilarState.CONTINUE).build()); // 계속 유사도를 멈춘다.
			}
		}catch(Exception e){
			e.printStackTrace();
			// NOTE : STOMP 응답 전송하기
			stompService.AnimalFailRes(stompUrl, MessageResponse.builder()
					.roomId(animalSimilarReqDto.getRoomId())
					.animalType(AnimalType.friendsAnimal)
					.message("유사도 측정에 실패했습니다.").responseState(ResponseState.FAIL).build());

			throw new SimilarityCheckException("유사도 측정에 실패했습니다.");
		}
	}

	// TODO : 내가 그린 이미지 S3에 저장하기
	@Operation(summary = "이미지를 S3에 저장한다.", description = "USER")
	@PostMapping
	public ResponseEntity<Void> saveUserImage(@ModelAttribute FriendsAnimalUploadReqDto friendsAnimalUploadReqDto) throws IOException {
		MultiValueMap<String, Object> bodyData = new LinkedMultiValueMap<>();

		// TODO : contextHolder에서 userId 가져오기
		bodyData.set("userId", 1L);
		bodyData.set("category", AnimalType.friendsAnimal.name());
		bodyData.set("image", friendsAnimalUploadReqDto.getFile().getResource());
		try{
			String urlWork = commMethod.postMultipartMethod(bodyData, imageUrl+"/comm/myWork");

			// NOTE : childWork에 정보 저장하기
			childWorkService.saveChildWork(friendsAnimalUploadReqDto.getFriendsAnimalId(), AnimalType.friendsAnimal.name(), urlWork);
			return ResponseEntity.ok().build();
		}catch (Exception e){
			throw new SaveImageException("이미지를 S3에 저장할 수 없습니다.");
		}
	}
}
