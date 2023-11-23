package com.yehah.draw.domain.google_search.service;

import com.google.api.services.customsearch.v1.model.Search;

public interface GoogleSearchService {
//    public Search searchImages(String query) throws Exception;
    public String getImgUrl(String name);

}
