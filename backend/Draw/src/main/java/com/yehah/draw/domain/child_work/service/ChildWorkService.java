package com.yehah.draw.domain.child_work.service;

import org.springframework.web.multipart.MultipartFile;

import com.yehah.draw.domain.child_work.entity.ChildWork;

import java.util.List;

public interface ChildWorkService {
    //이거도 urlGif 추가해야함
    public void saveChildWork(Long workId, String name, String urlWork);

    public void saveChildWorksComm(String category, Long workId, MultipartFile imageFile, MultipartFile gifFile);

    public List<ChildWork> animalList();

    public List<ChildWork> uploadList();

}
