package com.yehah.user.domain.user.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChangeIconRequestDTO {
    private Long iconId;
    private Long childId;
}
