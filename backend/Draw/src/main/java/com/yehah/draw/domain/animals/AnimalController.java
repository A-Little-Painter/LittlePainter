package com.yehah.draw.domain.animals;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/draws")
public class AnimalController {
    @GetMapping
    public void socketTest(){
        log.info("hihi~~");
        return;
    }
}
