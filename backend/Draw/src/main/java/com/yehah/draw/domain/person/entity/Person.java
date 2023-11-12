package com.yehah.draw.domain.person.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "person")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "child_id", nullable = false)
    private Long childId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String detail;

    @Column(name = "url_original", length = 200, nullable = false)
    private String urlOriginal;

    @Column(name = "url_trace", length = 200, nullable = false)
    private String urlTrace;
}
