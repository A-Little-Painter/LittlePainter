package com.yehah.draw.domain.child_work.service;

import com.yehah.draw.domain.category.service.CategoryService;
import com.yehah.draw.domain.child_work.dto.response.UploadS3MypageResDto;
import com.yehah.draw.domain.child_work.entity.ChildWork;
import com.yehah.draw.domain.child_work.repository.ChildWorkRepository;
import com.yehah.draw.domain.user.response.ChildResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChildWorkServiceImpl implements ChildWorkService{

    private final ChildWorkRepository childWorkRepository;

    private final CategoryService categoryService;
    private final ChildWorkCommService childWorkCommService;

    /*
    public void saveChildWork(Long workId, String name, String urlWork){
        // TODO : contextHolder에서 childId 가져와야함
//        ChildResponseDTO child = (ChildResponseDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        childWorkRepository.save(ChildWork.builder()
                .childId(1L)
                .categoryId(categoryService.getCategoryId(name)) // 카테고리의 ID를 가져온다.
                .workId(workId)
                .urlWork(urlWork)
                .createdDate(LocalDateTime.now()).build());
    }
    */

    public Long saveChildWorksComm(String category, Long workId, MultipartFile imageFile, String gifUrl){

        // TODO : childId 가져와야함
//        ChildResponseDTO child = (ChildResponseDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UploadS3MypageResDto response = childWorkCommService.postS3MyPage(category, 1L, imageFile, gifUrl).block();

        return saveChildWorks(category, workId, response, 1L);

        // non-blocking
        // childWorkCommService.postS3Server(category, workId, imageFile, gifFile)
        //     .subscribe(response -> {
        //         log.info(">>>>>> Yeah", response.toString());
        //         saveChildWork(category, workId, response, 1L);
        //     });
    }

    public Long saveChildWorks(String category, Long workId, UploadS3MypageResDto uploadS3MypageResDto, Long childId){
        return childWorkRepository.save(ChildWork.builder()
            .childId(childId)
            .categoryId(categoryService.getCategoryId(category))
            .workId(workId)
            .urlWork(uploadS3MypageResDto.getImageFileUrl())
            .urlGif(uploadS3MypageResDto.getGifFileUrl())
            .createdDate(LocalDateTime.now())
            .build()).getId();
    }

    public List<ChildWork> animalList(){
        ChildResponseDTO child = (ChildResponseDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info(child.getChildId().toString());
        List<ChildWork> list = childWorkRepository.findByChildIdAndCategoryId(child.getChildId(),1L);

        return list;
    }

    public List<ChildWork> uploadList(){
        ChildResponseDTO child = (ChildResponseDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info(child.getChildId().toString());
        List<ChildWork> list = childWorkRepository.findByChildIdAndCategoryId(child.getChildId(),2L);

        return list;
    }

    public List<String> getGifTotalList(){
        List<String> resultList = new ArrayList<>();
        for(ChildWork childWork : childWorkRepository.findAll()){
            resultList.add(childWork.getUrlGif());
        }
        return resultList;
    }
}
