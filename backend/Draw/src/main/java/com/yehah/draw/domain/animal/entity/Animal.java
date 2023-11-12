package com.yehah.draw.domain.animal.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "animal")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Animal {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 20, nullable = false)
	private String animalType; // 동물 종류 ex) 토끼, 사슴

	@Column(columnDefinition = "TEXT", nullable = false)
	private String detail; // 동물에 대한 설명

	@Column(length = 200, nullable = false)
	private String urlOriginal; // 원본 url

	@Column(length = 200, nullable = false)
	private String urlTrace; // 테두리 url

	@Column(length = 200)
	private String urlSound; // 동물의 울음소리
}
