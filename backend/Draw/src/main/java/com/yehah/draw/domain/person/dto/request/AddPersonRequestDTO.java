package com.yehah.draw.domain.person.dto.request;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddPersonRequestDTO {
    private String title;
    private String detail;
    private String originalUrl;
    private String traceUrl;
}
