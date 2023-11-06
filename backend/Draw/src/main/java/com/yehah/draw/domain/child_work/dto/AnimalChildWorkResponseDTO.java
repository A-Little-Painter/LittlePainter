package com.yehah.draw.domain.child_work.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AnimalChildWorkResponseDTO {
    private Long workId;
    private String name;
    private String urlWork;
    private LocalDateTime createdDate;
}
