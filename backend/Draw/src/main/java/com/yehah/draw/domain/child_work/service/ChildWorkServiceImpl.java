package com.yehah.draw.domain.child_work.service;


import com.yehah.draw.domain.category.service.CategoryService;
import com.yehah.draw.domain.child_work.entity.ChildWork;
import com.yehah.draw.domain.child_work.repository.ChildWorkRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChildWorkServiceImpl implements ChildWorkService{

    private final ChildWorkRepository childWorkRepository;

    private final CategoryService categoryService;

    public void saveChildWork(Long workId, String name, String urlWork){
        // TODO : contextHolder에서 childId 가져와야함
        childWorkRepository.save(ChildWork.builder()
                .childId(1L)
                .categoryId(categoryService.getCategoryId(name)) // 카테고리의 ID를 가져온다.
                .workId(workId)
                .urlWork(urlWork)
                .createdDate(LocalDateTime.now()).build());

    }


}
