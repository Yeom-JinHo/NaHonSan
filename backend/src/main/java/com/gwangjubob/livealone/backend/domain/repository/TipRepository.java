package com.gwangjubob.livealone.backend.domain.repository;

import com.gwangjubob.livealone.backend.domain.entity.TipEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TipRepository extends JpaRepository<TipEntity, Integer> {
    Optional<TipEntity> findByIdx(Integer idx);
}
