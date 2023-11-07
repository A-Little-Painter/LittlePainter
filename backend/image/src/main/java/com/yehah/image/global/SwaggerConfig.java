package com.yehah.image.global;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {
	@Bean
	public OpenAPI openAPI() {
		Info info = new Info()
			.title("꼬마화가 Image-Service")
			.description("꼬마화가의 Image Service API 명세서입니다.")
			.version("v0.0.1");

		return new OpenAPI()
			.components(new Components())
			.info(info);
	}
}

