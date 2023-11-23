package com.yehah.draw.domain.detection.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DetectionService {
    public ResponseEntity<?> uploadAnimals(MultipartFile file) throws IOException;
}
