package com.yehah.user.domain.user.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class ChangeChildRequestDTO {
    private Long childId;
    private String nickname;
    private LocalDate birthday;
}
