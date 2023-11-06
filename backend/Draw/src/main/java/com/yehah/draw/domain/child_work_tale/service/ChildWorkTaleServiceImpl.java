package com.yehah.draw.domain.child_work_tale.service;

import com.yehah.draw.domain.child_work_tale.dto.response.GetMyTalesResponseDTO;
import com.yehah.draw.domain.child_work_tale.entity.ChildWorkTale;
import com.yehah.draw.domain.child_work_tale.repository.ChildWorkTaleRepository;
import com.yehah.draw.domain.user.response.ChildResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChildWorkTaleServiceImpl implements ChildWorkTaleService{

    private final ChildWorkTaleRepository childWorkTaleRepository;

    //자녀 작업물_동화 저장
    public void saveChildWorkTale(Long taleId, Long pageId, String urlWork, String urlGif){
//        ChildResponseDTO child = (ChildResponseDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //taleId, pageId
        childWorkTaleRepository.save(ChildWorkTale.builder()
                .childId(1L)
                .taleId(taleId)
                .pageId(pageId)
                .urlWork(urlWork)
                .urlGif(urlGif)
                .createdDate(LocalDateTime.now())
                .build());
    }

    public List<GetMyTalesResponseDTO> getMyTales(){
//        ChildResponseDTO child = (ChildResponseDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<GetMyTalesResponseDTO> list = childWorkTaleRepository.findDistinctTalesByChildId(1L);

        return list;
    }
}
