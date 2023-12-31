package com.yehah.draw.domain.tale.entity;

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
@Table(name = "tale")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Tale {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 50, nullable = false)
	private String title;

	@Column(columnDefinition = "TEXT", nullable = false)
	private String detail;

	@Column(name = "max_page", nullable = false)
	private int maxPage;

	@Column(name = "url_cover", length = 200, nullable = false)
	private String urlCover;
}
