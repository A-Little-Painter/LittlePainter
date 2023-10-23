package com.yehah.draw.domain.animals.entity;

import org.springframework.web.multipart.MultipartFile;

public class Picture {
    private Long id;
    private String sessionId;
    private MultipartFile multipartFile;
}
