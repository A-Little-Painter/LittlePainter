package com.yehah.draw.domain.child_work.service;

import org.springframework.web.multipart.MultipartFile;

import com.yehah.draw.domain.child_work.entity.ChildWork;

import java.util.List;

public interface ChildWorkService {

    // public void saveChildWork(Long workId, String name, String urlWork);

    public Long saveChildWorksComm(String category, Long workId, String imageUrl, String gifUrl);

    public List<ChildWork> animalList();

    public List<ChildWork> uploadList();

    public List<String> getGifTotalList();

}
