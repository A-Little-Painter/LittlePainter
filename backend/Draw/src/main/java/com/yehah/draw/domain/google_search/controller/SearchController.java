package com.yehah.draw.domain.google_search.controller;

//import com.google.api.services.customsearch.v1.model.Search;
import com.yehah.draw.domain.google_search.dto.request.GoogleSearchRequestDTO;
import com.yehah.draw.domain.google_search.service.GoogleSearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/search")
public class SearchController {
    private final GoogleSearchService googleSearchService;

    @PostMapping("/images")
    public ResponseEntity<String> searchImages(@RequestBody GoogleSearchRequestDTO googleSearchRequestDTO){
        log.info("query: {}", googleSearchRequestDTO.getName());

            String results = googleSearchService.getImgUrl(googleSearchRequestDTO.getName());
            return ResponseEntity.ok(results);

    }

}
