package com.yehah.draw.domain.child_work_tale.repository;

import com.yehah.draw.domain.child_work_tale.dto.response.GetMyTalesResponseDTO;
import com.yehah.draw.domain.child_work_tale.entity.ChildWorkTale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChildWorkTaleRepository extends JpaRepository<ChildWorkTale, Long> {
    @Query("SELECT new com.yehah.draw.domain.child_work_tale.dto.response.GetMyTalesResponseDTO(c.taleId, t.urlCover, t.title) " +
            "FROM ChildWorkTale c " +
            "JOIN Tale t ON t.id = c.taleId " +
            "WHERE c.childId = :childId " +
            "GROUP BY c.taleId, t.urlCover, t.title")
    List<GetMyTalesResponseDTO> findDistinctTalesByChildId(@Param("childId") Long childId);

     List<ChildWorkTale> findChildWorkTalesByChildIdAndAndTaleId(@Param("childId") Long childId, @Param("taleId") Long taleId);
}
