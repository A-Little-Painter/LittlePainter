package com.yehah.draw.domain.detection.utils;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoogleTranslateService {
    private final Translate translate;

    @Autowired
    public GoogleTranslateService(GoogleCredentials googleCredentials) {
        // GoogleCredentials를 이용해 인증하고 Translate 서비스를 초기화
        this.translate = TranslateOptions.newBuilder().setCredentials(googleCredentials).build().getService();
    }


    public String translateToKorean(String text) {
        // Translate API를 호출하여 번역
        Translation translation = translate.translate(
                text,
                Translate.TranslateOption.sourceLanguage("en"),
                Translate.TranslateOption.targetLanguage("ko"));
        return translation.getTranslatedText();
    }

}
