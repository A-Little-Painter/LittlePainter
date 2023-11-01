package com.yehah.draw.domain.category.service;

import com.yehah.draw.domain.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;

    // 카테고리 목록 조회하기
    public int getCategoryId(String name){
        return categoryRepository.findByName(name).getId();
    }

}
