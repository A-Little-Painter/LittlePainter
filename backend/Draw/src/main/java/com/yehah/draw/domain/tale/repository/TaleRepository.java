package com.yehah.draw.domain.tale.repository;

import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yehah.draw.domain.friends_animal.entity.FriendsAnimal;
import com.yehah.draw.domain.tale.dto.response.TaleListResDto;
import com.yehah.draw.domain.tale.entity.Tale;

@Repository
public interface TaleRepository extends JpaRepository<Tale, Long> {
	Slice<TaleListResDto> findSliceBy(Pageable pageable);
}
