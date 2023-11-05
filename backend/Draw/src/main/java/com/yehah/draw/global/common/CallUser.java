package com.yehah.draw.global.common;

import com.yehah.draw.domain.user.request.ChildRequestDTO;
import com.yehah.draw.domain.user.response.ChildResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Service
@RequiredArgsConstructor
public class CallUser {
    @Value("${micro.path.user}")
    private String userUrl;

    private final WebClient.Builder webClientBuilder;

    public ChildResponseDTO getChildInfo(String email) {
        String url = userUrl + "/child-info";

        ChildRequestDTO childRequestDTO = ChildRequestDTO.builder()
                .email(email)
                .build();

        WebClient webClient = webClientBuilder.build();

        try {
            return webClient.post()
                    .uri(url)
                    .bodyValue(childRequestDTO)
                    .retrieve()
                    .bodyToMono(ChildResponseDTO.class)
                    .block();

        } catch (Exception e) {
            log.error("CallUser.getChildInfo : {}", e.getMessage());
            return null;
        }
    }
}
