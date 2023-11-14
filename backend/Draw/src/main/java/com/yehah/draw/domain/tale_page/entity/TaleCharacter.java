package com.yehah.draw.domain.tale_page.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "tale_character")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaleCharacter {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "tale_page_id")
	private TalePage talePage;

	@Column(name = "name", length = 50, nullable = false)
	private String characterName;

	@Column(name = "url_original", length = 200, nullable = false)
	private String urlOriginal;

	@Column(name = "url_gif", length = 200, nullable = true)
	private String urlGif;

	@Column(name = "url_trace", length = 200, nullable = true)
	private String urlTrace;

	@Column(name = "movement", length = 50, nullable = true)
	private String movement;

	@Column(name = "start_x", precision = 4, scale = 3, nullable = false)
	private BigDecimal startX;

	@Column(name = "start_y", precision = 4, scale = 3, nullable = false)
	private BigDecimal startY;

	@Column(name = "end_x", precision = 4, scale = 3, nullable = false)
	private BigDecimal endX;

	@Column(name = "end_y", precision = 4, scale = 3, nullable = false)
	private BigDecimal endY;

}
