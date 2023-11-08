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
import com.yehah.draw.domain.google_search.exception.NotFoundNameException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

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
        if (name == null || name.trim().isEmpty()) {
            throw new NotFoundNameException("검색어가 비어 있습니다.");
        }

        while (retryCount < maxRetries) {
            try {
                Connection.Response res = Jsoup.connect("https://www.googleapis.com/customsearch/v1")
                        .ignoreContentType(true)
                        .userAgent("Mozilla/5.0 ... Safari/537.36")
                        .data("key", apiKey)
                        .data("cx", cseId)
                        .data("q", name)
                        .data("searchType", "image")
                        .execute();
//                System.out.println(res.body());
                JSONObject json = new JSONObject(res.body());
                imageUrl = json.getJSONArray("items")
                        .getJSONObject(0)
//                        .getJSONObject("pagemap")
//                        .getJSONArray("cse_image")
//                        .getJSONObject(0)
//                        .getString("src");
                        .getString("link");
                break; // 이미지 URL을 성공적으로 받았으므로 반복 중지

            } catch (JSONException e) {
                throw new JSONParseException("JSON 파싱 에러");
//                imageUrl="";
            } catch (IOException e) {
                log.info("ioexception"+e.getMessage());
                imageUrl = "";
            } catch (Exception e) {
                throw new NetworkException("네트워크 에러");
//                imageUrl= "";
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
            throw new ImageException("이미지 URL 요청 초과");
        }

        return imageUrl;
    }

    public String getNaverImage(String keyword) {
        String imageUrl = "";
        String searchUrl = "https://terms.naver.com/search.naver?query=" +
                URLEncoder.encode(keyword, StandardCharsets.UTF_8) + "&searchType=image";

        try {
            Document doc = Jsoup.connect(searchUrl)
                    .ignoreContentType(true)
                    .userAgent("Mozilla/5.0 ... Safari/537.36")
                    .get();

            // 네이버 검색 결과 페이지의 이미지 선택자를 찾아서 사용해야 합니다.
            // 여기서는 가정한 예시로 .photo_grid _box img를 사용합니다.
            // 실제 적용하기 전에 해당 웹페이지의 구조를 확인해야 합니다.
            Element imageElement = doc.select(".photo_grid .box img").first();

            if (imageElement != null) {
                imageUrl = imageElement.absUrl("src"); // 절대 URL을 얻습니다.
            }
        } catch (IOException e) {
            // 예외 처리: 연결 실패 등
            e.printStackTrace();
        }

        return imageUrl;
    }

}
