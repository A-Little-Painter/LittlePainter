package com.yehah.draw.domain.tale_page.entity;

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

	@Column(name = "narration_before", columnDefinition = "TEXT", nullable = false)
	private String narrationBefore;

	@Column(name = "narration_after", columnDefinition = "TEXT")
	private String narrationAfter;

	@Column(name = "request_character", length = 20)
	private String requestCharacter;

	@Column(name = "url_original", length = 200)
	private String urlOriginal;

	@Column(name = "url_trace", length = 200)
	private String urlTrace;
}
