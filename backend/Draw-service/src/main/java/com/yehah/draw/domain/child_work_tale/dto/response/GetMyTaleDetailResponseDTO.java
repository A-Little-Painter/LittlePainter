package com.yehah.draw.domain.child_work_tale.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GetMyTaleDetailResponseDTO {
    private Long taleId;
    private Long pageId;
    private String urlGif;
    private String urlWork;
}
