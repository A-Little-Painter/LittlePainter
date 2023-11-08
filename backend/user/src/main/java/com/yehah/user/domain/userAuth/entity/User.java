package com.yehah.user.domain.userAuth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yehah.user.domain.userAuth.enums.Role;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private LocalDateTime deletedDate;

    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean tts;

    @Column
    private Long lastSelectedChildId;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Child> children = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Role role;

    @Builder
    public User(String email, String password, boolean tts, Child child, Long lastSelectedChildId, LocalDateTime deletedDate) {
        this.email = email;
        this.password = password;
        this.tts = tts;
        this.role = Role.ROLE_USER;
        this.lastSelectedChildId = lastSelectedChildId;
        this.deletedDate = deletedDate;
        if(child != null) {
            addChild(child);
        }
    }

    public void addChild(Child child) {
        this.children.add(child);
        if (child.getUser() != this) {
            child.setUser(this);
        }
    }

    public User updateSelectChild(User user){
        if(user.lastSelectedChildId!=null){
            this.lastSelectedChildId = user.lastSelectedChildId;
        }
        return this;
    }

    public void toggleTts() {
        this.tts = !this.tts;
    }

    public User deleteUser(){
        this.deletedDate = LocalDateTime.now();
        this.role = Role.ROLE_DELETED;

        return this;
    }
}
