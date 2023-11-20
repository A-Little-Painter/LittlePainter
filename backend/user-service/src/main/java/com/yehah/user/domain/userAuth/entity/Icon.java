package com.yehah.user.domain.userAuth.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Icon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String urlIcon;

    @OneToMany(mappedBy = "icon", cascade = CascadeType.ALL)
    private List<Child> icons = new ArrayList<>();

}
