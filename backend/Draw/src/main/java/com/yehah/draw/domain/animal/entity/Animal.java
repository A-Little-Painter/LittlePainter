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
	private String animalType;

	@Column(columnDefinition = "TEXT", nullable = false)
	private String detail;

	@Column(length = 200, nullable = false)
	private String urlOriginal;

	@Column(length = 200, nullable = false)
	private String urlTrace;

	@Column(length = 200, nullable = false)
	private String urlSound;
}
