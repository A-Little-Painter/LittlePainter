package com.yehah.draw.domain.child_work.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface ChildWorkService {
    public void saveChildWork(Long workId, String name, String urlWork);
    public void saveChildWorksComm(String category, Long workId, MultipartFile imageFile, MultipartFile gifFile);
}
