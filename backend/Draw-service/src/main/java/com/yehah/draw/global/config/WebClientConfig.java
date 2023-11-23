package com.yehah.draw.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Configuration
public class WebClientConfig {

	@Value("${micro.path.image}")
	private String imageUrl;

	@Bean
	public WebClient imageWebClient() {
		WebClient webClient = WebClient.builder()
			.baseUrl(imageUrl)
			.clientConnector(new ReactorClientHttpConnector())
			.filter(requestFilter())
			.filter(responseFilter())
			.defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.MULTIPART_FORM_DATA_VALUE)
			.build();

		return webClient;
	}

	@Bean
	public ExchangeFilterFunction requestFilter() {

		return ExchangeFilterFunction.ofRequestProcessor(
			clientRequest -> {
				log.info(">>>>>>>>> REQUEST <<<<<<<<<<");
				log.info("Request: {} {}", clientRequest.method(), clientRequest.url());
				clientRequest.headers().forEach((name, value) ->
					log.info("{} : {}", name, value));
				return Mono.just(clientRequest);
			}
		);
	}
	@Bean
	public ExchangeFilterFunction responseFilter() {
		return ExchangeFilterFunction.ofResponseProcessor(
			clientResponse -> {
				log.info(">>>>>>>>>> RESPONSE <<<<<<<<<<");
				clientResponse.headers().asHttpHeaders().forEach((name, values) ->
					values.forEach(value -> log.info("{} {}", name, value))
				);
				return Mono.just(clientResponse);
			}
		);
	}
}
