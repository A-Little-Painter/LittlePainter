package com.yehah.draw.domain.child_work_tale.service;

import com.yehah.draw.domain.child_work.dto.response.UploadS3MypageResDto;
import com.yehah.draw.domain.child_work.service.ChildWorkCommService;
import com.yehah.draw.domain.child_work_tale.dto.request.AddChildWorkTaleReqDto;
import com.yehah.draw.domain.child_work_tale.dto.response.GetMyTaleDetailResponseDTO;
import com.yehah.draw.domain.child_work_tale.dto.response.GetMyTalesResponseDTO;
import com.yehah.draw.domain.child_work_tale.dto.response.UploadS3MypageTaleResDto;
import com.yehah.draw.domain.child_work_tale.entity.ChildWorkTale;
import com.yehah.draw.domain.child_work_tale.exception.NullPointerException;
import com.yehah.draw.domain.child_work_tale.exception.*;
import com.yehah.draw.domain.child_work_tale.repository.ChildWorkTaleRepository;
import com.yehah.draw.domain.user.response.ChildResponseDTO;
import jakarta.transaction.Transactional;
import jakarta.transaction.TransactionalException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChildWorkTaleServiceImpl implements ChildWorkTaleService{

    private final ChildWorkTaleRepository childWorkTaleRepository;
    private final ChildWorkCommService childWorkCommService;
    private final ChildWorkTaleCommService childWorkTaleCommService;

    //자녀 작업물_동화 저장
    @Transactional
    public void saveChildWorkTale(Long taleId, List<AddChildWorkTaleReqDto> addChildWorkTaleReqDtoList){
        try{
            // TODO : childId 변경
        ChildResponseDTO child = (ChildResponseDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            LocalDateTime createDateTime = LocalDateTime.now();
            List<UploadS3MypageTaleResDto> resDtos = childWorkTaleCommService.postS3MyPage(addChildWorkTaleReqDtoList).block();

            for(UploadS3MypageTaleResDto resDto : resDtos) {
                childWorkTaleRepository.save(ChildWorkTale.builder()
                    .childId(child.getChildId())
                    .taleId(taleId)
                    .pageId(resDto.getTalePageId())
                    .urlWork(resDto.getImageFileUrl())
                    .urlGif(resDto.getGifFileUrl())
                    .createdDate(createDateTime)
                    .build());
            }
            // for(AddChildWorkTaleReqDto reqDto : addChildWorkTaleReqDtoList){
            //     UploadS3MypageResDto uploadS3MypageResDto = childWorkCommService.postS3MyPage("tale", 1L, reqDto.getUrlImage(),
            //         reqDto.getUrlGif()).block();
            //     // UploadS3MypageResDto uploadS3MypageResDto = childWorkCommService.postS3MyPage("tale", 1L, reqDto.getImageFile(),
            //     //     reqDto.getUrlGif()).block();
            //     childWorkTaleRepository.save(ChildWorkTale.builder()
            //             .childId(1L)
            //             .taleId(taleId)
            //             .pageId(reqDto.getTalePageId())
            //             .urlWork(uploadS3MypageResDto.getImageFileUrl())
            //             .urlGif(uploadS3MypageResDto.getGifFileUrl())
            //             .createdDate(createDateTime)
            //             .build());
            // }

            //taleId, pageId
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
        ChildResponseDTO child = (ChildResponseDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<GetMyTalesResponseDTO> list = childWorkTaleRepository.findDistinctTalesByChildId(child.getChildId());

        return list;
    }

    @Transactional
    public List<GetMyTaleDetailResponseDTO> getMyTaleDetail(Long taleId) {
        // TODO : childId 변경
        ChildResponseDTO child = (ChildResponseDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<ChildWorkTale> childWorkTaleList =  childWorkTaleRepository.findChildWorkTalesByChildIdAndAndTaleId(child.getChildId(), taleId);
        return childWorkTaleList.stream()
            .map(childWorkTale -> GetMyTaleDetailResponseDTO.builder()
                .taleId(childWorkTale.getTaleId())
                .pageId(childWorkTale.getPageId())
                .urlGif(childWorkTale.getUrlGif())
                .urlWork(childWorkTale.getUrlWork())
                .build()
        ).collect(Collectors.toList());
    }
}
