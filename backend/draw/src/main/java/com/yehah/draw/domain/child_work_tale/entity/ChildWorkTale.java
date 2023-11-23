package com.yehah.draw.domain.child_work_tale.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "child_work_tale")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChildWorkTale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long childId;

    private Long taleId;

    private Long pageId;

    private String urlGif;

    private String urlWork;

    private LocalDateTime createdDate;
}
