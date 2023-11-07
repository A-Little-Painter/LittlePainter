package com.yehah.draw.domain.child_work_tale.service;

import com.yehah.draw.domain.child_work_tale.dto.request.AddChildWorkTaleReqDto;
import com.yehah.draw.domain.child_work_tale.dto.response.GetMyTalesResponseDTO;

import java.util.List;

public interface ChildWorkTaleService {
    public void saveChildWorkTale(Long taleId, List<AddChildWorkTaleReqDto> addChildWorkTaleReqDtoList);

    public List<GetMyTalesResponseDTO> getMyTales();

}
