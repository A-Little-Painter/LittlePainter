package com.yehah.draw.domain.person.controller;

import com.yehah.draw.domain.person.dto.request.AddPersonRequestDTO;
import com.yehah.draw.domain.person.dto.request.PersonSimilarRequestDTO;
import com.yehah.draw.domain.person.dto.response.PersonChoiceResponseDTO;
import com.yehah.draw.domain.person.dto.response.PersonListResponseDTO;
import com.yehah.draw.domain.person.service.PersonCommService;
import com.yehah.draw.domain.person.service.PersonService;
import com.yehah.draw.global.Processor.SimilarCheckProcessor;
import com.yehah.draw.global.common.AnimalType;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/person")
public class PersonController {

    private final PersonService personService;
    private final PersonCommService personCommService;

    private final SimilarCheckProcessor similarCheckProcessor;


    @Operation(summary = "친구 사진 전체 목록을 조회", description = "친구 사진 전체 목록을 페이징 처리하여 리턴한다.")
    @GetMapping("")
    public ResponseEntity<Slice<PersonListResponseDTO>> getPersonList(@RequestParam(value = "page", defaultValue = "0") int page){
        log.debug("getPersonList() : page = {}, ", page);
        return ResponseEntity.ok(personService.getPersonList(page));
    }

    @Operation(summary = "내 친구 사진 업로드", description = "(USER) 나의 친구 사진을 업로드한다.")
    @PostMapping("")
    public ResponseEntity<Long> addMyPersonImage(@RequestBody AddPersonRequestDTO addPersonRequestDTO){
        return ResponseEntity.ok(personCommService.addPersonImage(addPersonRequestDTO));
    }

    @Operation(summary = "선택한 친구의 테두리 사진과 설명을 가져온다.", description = "ALL")
    @GetMapping("/{personId}")
    public ResponseEntity<PersonChoiceResponseDTO> getTraceUrl(@PathVariable(name = "personId") Long personId){
        return ResponseEntity.ok(personService.getPersonChoice(personId));
    }

    @Operation(summary = "친구 사진 유사도 확인", description = "ALL")
    @PostMapping("/similarcheck")
    //TODO 이거 유사도랑 AnimalType을 확인해야함
    public ResponseEntity<Void> personSimilarityCheck(@ModelAttribute PersonSimilarRequestDTO personSimilarRequestDTO) throws IOException {
        similarCheckProcessor.similarCheck(personSimilarRequestDTO.getRoomId(), personSimilarRequestDTO.getOriginalFile(), personSimilarRequestDTO.getNewFile()
        ,0.19, AnimalType.friendsAnimal);

        return ResponseEntity.ok().build();
    }
}
