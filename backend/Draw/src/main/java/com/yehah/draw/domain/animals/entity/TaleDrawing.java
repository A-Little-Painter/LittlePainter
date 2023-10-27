package com.yehah.draw.domain.animals.entity;

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
@Table(name = "tale_drawing")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaleDrawing {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "tale_page_id", nullable = false)
	private Long talePageId;

	@Column(name = "url_original", length = 200, nullable = false)
	private String urlOriginal;

	@Column(name = "url_trace", length = 200, nullable = false)
	private String urlTrace;
}
