package com.yehah.draw.domain.child_work.service;

import com.yehah.draw.domain.child_work.entity.ChildWork;

import java.util.List;

public interface ChildWorkService {
    //이거도 urlGif 추가해야함
    public void saveChildWork(Long workId, String name, String urlWork);

    public List<ChildWork> animalList();

    public List<ChildWork> uploadList();
}
