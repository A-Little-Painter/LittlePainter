package com.yehah.draw.domain.user.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChildRequestDTO {
    private String email;

    @Builder
    public ChildRequestDTO(String email) {
        this.email = email;
    }
}
