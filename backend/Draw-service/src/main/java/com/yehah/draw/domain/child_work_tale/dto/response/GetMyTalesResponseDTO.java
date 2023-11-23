package com.yehah.draw.domain.child_work_tale.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GetMyTalesResponseDTO {
    private Long taleId;
    private String urlCover;
    private String title;

    public GetMyTalesResponseDTO(Long taleId, String urlCover, String title) {
        this.taleId = taleId;
        this.urlCover = urlCover;
        this.title = title;
    }
}
