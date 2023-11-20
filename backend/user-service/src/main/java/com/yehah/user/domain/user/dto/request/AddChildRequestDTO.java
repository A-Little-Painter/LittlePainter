package com.yehah.user.domain.user.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class AddChildRequestDTO {
    private String nickname;
    private LocalDate birthday;
    private Long iconId;
}
