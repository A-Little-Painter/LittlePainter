package com.yehah.draw.domain.google_search.service;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.customsearch.v1.Customsearch;
import com.google.api.services.customsearch.v1.CustomsearchRequestInitializer;
//import com.google.api.services.customsearch.v1.CustomSearchAPI;
//import com.google.api.services.customsearch.v1.CustomSearchAPIRequestInitializer;
import com.google.api.services.customsearch.v1.model.Search;

import com.yehah.draw.domain.google_search.exception.ImageException;
import com.yehah.draw.domain.google_search.exception.JSONParseException;
import com.yehah.draw.domain.google_search.exception.NetworkException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoogleSearchServiceImpl implements GoogleSearchService{

    @Value("${google.api.key}")
    private String apiKey;

    @Value("${google.cse.id}")
    private String cseId;

//    public Search searchImages(String query) throws Exception {
//
//        Customsearch customsearch1 = new Customsearch.Builder(GoogleNetHttpTransport.newTrustedTransport(), GsonFactory.getDefaultInstance(), null)
//                .setApplicationName("Google Images Search")
//                .setGoogleClientRequestInitializer(new CustomsearchRequestInitializer(apiKey))
//                .build();
//
////        Customsearch customsearch = new Customsearch.Builder(GoogleNetHttpTransport.newTrustedTransport(), JacksonFactory.getDefaultInstance(), null)
////                .setApplicationName("Google Images Search")
////                .setGoogleClientRequestInitializer(new CustomsearchRequestInitializer(apiKey))
////                .build();
//
//        Customsearch.Cse.List list = customsearch1.cse().list();
//        list.setCx(cseId);
//        list.setSearchType("image");
//
//        return list.execute();
//    }

    public String getImgUrl(String name) {
        String imageUrl = "";
        int maxRetries = 3; // 최대 재시도 횟수
        int retryCount = 0;

        while (retryCount < maxRetries) {
            try {
                Connection.Response res = Jsoup.connect("https://www.googleapis.com/customsearch/v1")
                        .ignoreContentType(true)
                        .userAgent("Mozilla/5.0 ... Safari/537.36")
                        .data("key", apiKey)
                        .data("cx", cseId)
                        .data("q", name)
                        .execute();

                JSONObject json = new JSONObject(res.body());
                imageUrl = json.getJSONArray("items")
                        .getJSONObject(0)
                        .getJSONObject("pagemap")
                        .getJSONArray("cse_image")
                        .getJSONObject(0)
                        .getString("src");
                break; // 이미지 URL을 성공적으로 받았으므로 반복 중지

            } catch (JSONException e) {
                throw new JSONParseException("JSON 파싱 에러");
            } catch (IOException e) {
                imageUrl = "";
            } catch (Exception e) {
                imageUrl= "";
            }

            retryCount++;
            if (retryCount < maxRetries) {
                try {
                    Thread.sleep(1000); // 재시도 전 1초 대기
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }

        if (imageUrl.isEmpty() && retryCount == maxRetries) {
            throw new ImageException("이미지 URL을 받아오는 데 실패했습니다.");
        }

        return imageUrl;
    }
}
