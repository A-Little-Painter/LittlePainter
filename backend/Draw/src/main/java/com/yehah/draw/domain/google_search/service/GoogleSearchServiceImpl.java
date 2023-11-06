package com.yehah.draw.domain.google_search.service;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.customsearch.v1.Customsearch;
import com.google.api.services.customsearch.v1.CustomsearchRequestInitializer;
//import com.google.api.services.customsearch.v1.CustomSearchAPI;
//import com.google.api.services.customsearch.v1.CustomSearchAPIRequestInitializer;
import com.google.api.services.customsearch.v1.model.Search;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoogleSearchServiceImpl implements GoogleSearchService{

    @Value("${google.api.key}")
    private String apiKey;

    @Value("${google.cse.id}")
    private String cseId;

    public Search searchImages(String query) throws Exception {

        Customsearch customsearch1 = new Customsearch.Builder(GoogleNetHttpTransport.newTrustedTransport(), GsonFactory.getDefaultInstance(), null)
                .setApplicationName("Google Images Search")
                .setGoogleClientRequestInitializer(new CustomsearchRequestInitializer(apiKey))
                .build();

//        Customsearch customsearch = new Customsearch.Builder(GoogleNetHttpTransport.newTrustedTransport(), JacksonFactory.getDefaultInstance(), null)
//                .setApplicationName("Google Images Search")
//                .setGoogleClientRequestInitializer(new CustomsearchRequestInitializer(apiKey))
//                .build();

        Customsearch.Cse.List list = customsearch1.cse().list();
        list.setCx(cseId);
        list.setSearchType("image");

        return list.execute();
    }

    public String getImgUrl(String name){
        String imageUrl = "";
        try{
            Connection.Response res = Jsoup.connect(
                            "https://www.googleapis.com/customsearch/v1?key=AIzaSyDwnwqk6oQMPrlV8rtqg0-OIYDTv2CBPZs&cx=95ec068c985c94f88&q=동물 " + name)
                    .ignoreContentType(true).userAgent("Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36").execute();
            JSONObject json = null;

            json = new JSONObject(res.body());
            imageUrl =
                    json.getJSONArray("items").getJSONObject(0).getJSONObject("pagemap").getJSONArray("cse_thumbnail").getJSONObject(0).getString("src");

        }catch (Exception e){
            imageUrl = "";
        }
        return imageUrl;
    }
}
