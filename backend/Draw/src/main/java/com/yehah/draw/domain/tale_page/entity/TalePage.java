package com.yehah.draw.domain.tale_page.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tale_page")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TalePage {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	@Column(name = "tale_id", nullable = false)
	private Long taleId;

	@Column(name = "page_number", nullable = false)
	private int pageNumber;

	@Column(name = "url_background", length = 200, nullable = false)
	private String urlBackground;

	@Column(name = "url_sound", length = 200, nullable = false)
	private String urlSound;

	@Column(name = "narration", columnDefinition = "TEXT", nullable = false)
	private String narration;

	@Column(name = "drawing", columnDefinition = "TINYINT(1)", nullable = false)
	private Boolean drawing;

	@OneToMany(mappedBy = "talePage", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<TaleCharacter> taleCharacters = new ArrayList<>();
}
