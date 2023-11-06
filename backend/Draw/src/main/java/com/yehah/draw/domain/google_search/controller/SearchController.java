package com.yehah.draw.domain.google_search.controller;

//import com.google.api.services.customsearch.v1.model.Search;
import com.yehah.draw.domain.google_search.service.GoogleSearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/search")
public class SearchController {
    private final GoogleSearchService googleSearchService;

    @GetMapping("/images")
    public ResponseEntity<String> searchImages(@RequestParam String query) {
        try {
            String results = googleSearchService.getImgUrl(query);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }

}
