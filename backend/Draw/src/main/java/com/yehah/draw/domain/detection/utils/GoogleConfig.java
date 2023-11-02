package com.yehah.draw.domain.detection.utils;

import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@Configuration
public class GoogleConfig {
    @Value("${google.cloud.credentials.type}")
    private String type;
    @Value("${google.cloud.project-id}")
    private String projectId;
    @Value("${google.cloud.credentials.private-key-id}")
    private String privateKeyId;
    @Value("${google.cloud.credentials.private-key}")
    private String privateKey;
    @Value("${google.cloud.credentials.client-email}")
    private String clientEmail;
    @Value("${google.cloud.credentials.client-id}")
    private String clientId;
    @Value("${google.cloud.credentials.auth-uri}")
    private String authUri;
    @Value("${google.cloud.credentials.token-uri}")
    private String tokenUri;
    @Value("${google.cloud.credentials.auth-provider-x509-cert-url}")
    private String authProviderX509CertUrl;
    @Value("${google.cloud.credentials.client-x509-cert-url}")
    private String clientX509CertUrl;

    @Bean
    public GoogleCredentials googleCredentials() throws IOException {
        String jsonCredentials = String.format("{\"type\": \"%s\", \"project_id\": \"%s\", \"private_key_id\": \"%s\", \"private_key\": \"%s\", \"client_email\": \"%s\", \"client_id\": \"%s\", \"auth_uri\": \"%s\", \"token_uri\": \"%s\", \"auth_provider_x509_cert_url\": \"%s\", \"client_x509_cert_url\": \"%s\"}",
                type, projectId, privateKeyId, privateKey, clientEmail, clientId, authUri, tokenUri, authProviderX509CertUrl, clientX509CertUrl);
        return GoogleCredentials.fromStream(new ByteArrayInputStream(jsonCredentials.getBytes()));
    }
}
