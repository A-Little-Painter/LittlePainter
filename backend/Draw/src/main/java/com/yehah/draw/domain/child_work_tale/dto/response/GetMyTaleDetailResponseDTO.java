package com.yehah.draw.domain.child_work_tale.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GetMyTaleDetailResponseDTO {
    private Long taleId;
    private Long pageId;
    private String urlGif;
    private String urlWork;
}
