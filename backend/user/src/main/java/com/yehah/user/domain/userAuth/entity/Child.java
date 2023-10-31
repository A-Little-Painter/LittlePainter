package com.yehah.user.domain.userAuth.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Child {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private LocalDate birthday;

    @Column
    private LocalDateTime deletedDate;

    @OneToOne
    @JoinColumn(name = "icon_id")
    private Icon icon;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public void setUser(User user) {
        this.user = user;
        // 반대편 엔터티에 이미 연관관계가 설정되어 있지 않을 때만 연관관계를 설정
        if (!user.getChildren().contains(this)) {
            user.addChild(this);
        }
    }

    @Builder
    public Child(String nickname, LocalDate birthday, Icon icon){
        this.nickname = nickname;
        this.birthday = birthday;
        this.icon = icon;
//        setUser(user);
    }
}
