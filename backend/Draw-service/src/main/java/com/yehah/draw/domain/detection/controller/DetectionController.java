package com.yehah.draw.domain.detection.controller;

import com.yehah.draw.domain.detection.dto.request.UploadAnimalsRequestDTO;
import com.yehah.draw.domain.detection.service.DetectionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/draws/upload")
public class DetectionController {
    private final DetectionService detectionService;

    @PostMapping("")
    public ResponseEntity<?> uploadAnimals(@RequestParam("file") MultipartFile file) throws IOException {
        return detectionService.uploadAnimals(file);
    }
}
