package com.yehah.draw.domain.child_work_tale.service;

import com.yehah.draw.domain.child_work_tale.dto.response.GetMyTalesResponseDTO;
import com.yehah.draw.domain.child_work_tale.entity.ChildWorkTale;
import com.yehah.draw.domain.child_work_tale.exception.NullPointerException;
import com.yehah.draw.domain.child_work_tale.exception.*;
import com.yehah.draw.domain.child_work_tale.repository.ChildWorkTaleRepository;
import jakarta.transaction.Transactional;
import jakarta.transaction.TransactionalException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChildWorkTaleServiceImpl implements ChildWorkTaleService{

    private final ChildWorkTaleRepository childWorkTaleRepository;

    //자녀 작업물_동화 저장
    @Transactional
    public void saveChildWorkTale(Long taleId, Long pageId, String urlWork, String urlGif){
        try{
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
        } catch (NullPointerException e){
            throw new NullPointerException("인증된 사용자 정보를 찾을 수 없습니다.");
        } catch (DataIntegrityViolationException e){
            throw new DataIntegrityException("데이터베이스 제약 조건 위반");
        } catch(TransactionalException e){
            throw new TransactionException("트랜잭션 처리 중 오류 발생");
        } catch (DataAccessException e){
            throw new DatabaseAccessException("데이터베이스 접근 중 오류 발생");
        }
    }
   public List<GetMyTalesResponseDTO> getMyTales(){
//        ChildResponseDTO child = (ChildResponseDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<GetMyTalesResponseDTO> list = childWorkTaleRepository.findDistinctTalesByChildId(1L);

        return list;
    }
}
