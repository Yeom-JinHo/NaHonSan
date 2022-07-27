package com.gwangjubob.livealone.backend.service.impl;


import com.gwangjubob.livealone.backend.domain.entity.DealEntity;
import com.gwangjubob.livealone.backend.domain.entity.UserEntity;
import com.gwangjubob.livealone.backend.domain.repository.DealRepository;
import com.gwangjubob.livealone.backend.domain.repository.UserRepository;
import com.gwangjubob.livealone.backend.dto.Deal.DealDto;
import com.gwangjubob.livealone.backend.mapper.DealMapper;
import com.gwangjubob.livealone.backend.service.DealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class DealServiceImpl implements DealService {
    private DealRepository dealRepository;
    private DealMapper dealMapper;
    private UserRepository userRepository;
    @Autowired
    DealServiceImpl(DealRepository dealRepository, DealMapper dealMapper, UserRepository userRepository){
        this.dealRepository = dealRepository;
        this.dealMapper = dealMapper;
        this.userRepository = userRepository;
    }


    @Override
    public DealDto registDeal(DealDto dealDto) {
        Optional<UserEntity> optionalUser = userRepository.findByNickname(dealDto.getUserNickname());
        DealDto data = new DealDto();
        if(optionalUser.isPresent()){
            UserEntity user = optionalUser.get();
            DealEntity deal = dealMapper.toEntity(dealDto);
            deal.setUser(user);
            dealRepository.save(deal);
            data = dealMapper.toDto(deal);
            data.setUserNickname(deal.getUser().getNickname());
        } else{
            data = null;
        }
        return data;
    }

    @Override
    public DealDto viewDetailDeal(Integer idx) {
        Optional<DealEntity> optionalDeal = dealRepository.findById(idx);
        DealDto data = new DealDto();
        if(optionalDeal.isPresent()){
            DealEntity deal = optionalDeal.get();
            data = dealMapper.toDto(deal);
            return data;
        } else{
            return null;
        }
    }

    @Override
    public DealDto updateDeal(Integer idx, DealDto dealDto) {
        Optional<DealEntity> optionalDeal = dealRepository.findById(idx);
        DealDto data = new DealDto();
        if(optionalDeal.isPresent()){
            DealEntity deal = optionalDeal.get();
            dealMapper.updateFromDto(dealDto, deal);
            DealEntity res =dealRepository.save(deal);
            data = dealMapper.toDto(res);
            return data;
        } else {
            return null;
        }
    }

    @Override
    public boolean deleteDeal(Integer idx) {
        Optional<DealEntity> optionalDeal = dealRepository.findById(idx);
        if(optionalDeal.isPresent()){
            DealEntity deal = optionalDeal.get();
            dealRepository.delete(deal);
            return true;
        } else{
            return false;
        }
    }
}
