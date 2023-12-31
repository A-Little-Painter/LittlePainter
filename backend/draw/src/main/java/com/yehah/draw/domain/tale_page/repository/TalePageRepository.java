package com.yehah.draw.domain.tale_page.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yehah.draw.domain.tale_page.entity.TalePage;

@Repository
public interface TalePageRepository extends JpaRepository<TalePage, Long> {

	List<TalePage> findByTaleId(Long taleId);
}