package com.gwangjubob.livealone.backend.domain.repository;

import com.gwangjubob.livealone.backend.domain.entity.TipEntity;
import com.gwangjubob.livealone.backend.domain.entity.UserEntity;
import com.gwangjubob.livealone.backend.domain.entity.UserLikeTipsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserLikeTipsRepository extends JpaRepository<UserLikeTipsEntity, Integer> {
    Optional<UserLikeTipsEntity> findByUserAndTip(UserEntity userEntity, TipEntity tipEntity);
}
