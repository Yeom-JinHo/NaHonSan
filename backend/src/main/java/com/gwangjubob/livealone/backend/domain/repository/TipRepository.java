package com.gwangjubob.livealone.backend.domain.repository;

import com.gwangjubob.livealone.backend.domain.entity.TipEntity;
import com.gwangjubob.livealone.backend.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TipRepository extends JpaRepository<TipEntity, Integer> {
    Optional<TipEntity> findByIdx(Integer idx);

//    @Query(value = "SELECT t FROM TipEntity t WHERE t.category=:category")
    List<TipEntity> findByCategory(String category);
    Optional<TipEntity> findByTitle(String title);

    List<TipEntity> findByUser(UserEntity userEntity);
}
