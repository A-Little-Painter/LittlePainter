package com.yehah.draw.domain.child_work.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="child_work")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChildWork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long childId;

    private Long categoryId;

    @Column(nullable = false)
    private Long workId; // 작업ID(동물, 내가 그린 동물 ID)

    @Column(name = "url_work", length = 200, nullable = false)
    private String urlWork; // 작업물URL

    @Column(name = "url_gif", length = 200)
    private String urlGif; // 작업물GIF

    @Column(name = "created_date", nullable = false)

    private LocalDateTime createdDate; // 생성한 날짜
}
