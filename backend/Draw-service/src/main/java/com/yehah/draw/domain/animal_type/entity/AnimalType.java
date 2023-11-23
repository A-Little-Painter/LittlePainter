package com.yehah.draw.domain.animal_type.entity;

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
@Table(name = "animal_type")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnimalType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name", length = 20, nullable = false)
	private String name;

	@Column(name = "url_sound", length = 200, nullable = false)
	private String urlSound;
}
