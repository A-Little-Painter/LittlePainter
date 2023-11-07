package com.yehah.draw.domain.child_work_tale.service;

import com.yehah.draw.domain.child_work_tale.dto.response.GetMyTalesResponseDTO;
import com.yehah.draw.domain.child_work_tale.entity.ChildWorkTale;

import java.util.List;

public interface ChildWorkTaleService {
    public void saveChildWorkTale(Long taleId, Long pageId, String urlWork, String urlGif);

    public List<GetMyTalesResponseDTO> getMyTales();

}
