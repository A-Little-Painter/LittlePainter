package com.yehah.draw.domain.child_work.service;


import com.yehah.draw.domain.category.service.CategoryService;
import com.yehah.draw.domain.child_work.dto.response.UploadS3MypageResDto;
import com.yehah.draw.domain.child_work.entity.ChildWork;
import com.yehah.draw.domain.child_work.repository.ChildWorkRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChildWorkServiceImpl implements ChildWorkService{

    private final ChildWorkRepository childWorkRepository;

    private final CategoryService categoryService;
    private final ChildWorkCommService childWorkCommService;

    private final WebClient imageWebClient;

    public void saveChildWork(Long workId, String name, String urlWork){
        // TODO : contextHolder에서 childId 가져와야함
        childWorkRepository.save(ChildWork.builder()
                .childId(1L)
                .categoryId(categoryService.getCategoryId(name)) // 카테고리의 ID를 가져온다.
                .workId(workId)
                .urlWork(urlWork)
                .createdDate(LocalDateTime.now()).build());
    }

    public void saveChildWorksComm(String category, Long workId, MultipartFile imageFile, MultipartFile gifFile){
        UploadS3MypageResDto response = childWorkCommService.postS3MyPage(category, workId, imageFile, gifFile).block();
        // TODO : childId 가져와야함
        saveChildWorks(category, workId, response, 1L);

        // non-blocking
        // childWorkCommService.postS3Server(category, workId, imageFile, gifFile)
        //     .subscribe(response -> {
        //         log.info(">>>>>> Yeah", response.toString());
        //         saveChildWork(category, workId, response, 1L);
        //     });
    }

    public void saveChildWorks(String category, Long workId, UploadS3MypageResDto uploadS3MypageResDto, Long childId){
        childWorkRepository.save(ChildWork.builder()
            .childId(childId)
            .categoryId(categoryService.getCategoryId(category))
            .workId(workId)
            .urlWork(uploadS3MypageResDto.getImageFileUrl())
            .urlGif(uploadS3MypageResDto.getGifFileUrl())
            .createdDate(LocalDateTime.now())
            .build());
    }

}
