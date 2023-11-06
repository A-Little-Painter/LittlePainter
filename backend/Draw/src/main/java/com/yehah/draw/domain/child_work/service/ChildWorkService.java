package com.yehah.draw.domain.child_work.service;

<<<<<<< HEAD
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface ChildWorkService {
    public void saveChildWork(Long workId, String name, String urlWork);
    public void saveChildWorksComm(String category, Long workId, MultipartFile imageFile, MultipartFile gifFile);
=======
import com.yehah.draw.domain.child_work.entity.ChildWork;

import java.util.List;

public interface ChildWorkService {
    public void saveChildWork(Long workId, String name, String urlWork);

    public List<ChildWork> animalList();

    public List<ChildWork> uploadList();
>>>>>>> deploy/Draw-Service
}
