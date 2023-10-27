package com.yehah.draw.domain.animals.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "friends_animal")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FriendsAnimal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "animal_type_id")
	private AnimalType animalType;

	@Column(length = 50, nullable = false)
	private String title;

	@Column(length = 110, nullable = false)
	private String detail;

	@Column(name = "url_original", length = 200, nullable = false)
	private String urlOriginal;

	@Column(name = "url_trace", length = 200, nullable = false)
	private String urlTrace;

	@Column(columnDefinition = "TINYINT(1)", nullable = false)
	private boolean movable;
}
