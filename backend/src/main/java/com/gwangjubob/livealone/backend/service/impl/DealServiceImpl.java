package com.gwangjubob.livealone.backend.service.impl;


import com.gwangjubob.livealone.backend.domain.entity.DealCommentEntity;
import com.gwangjubob.livealone.backend.domain.entity.DealEntity;
import com.gwangjubob.livealone.backend.domain.entity.UserEntity;
import com.gwangjubob.livealone.backend.domain.repository.DealCommentRepository;
import com.gwangjubob.livealone.backend.domain.repository.DealRepository;
import com.gwangjubob.livealone.backend.domain.repository.UserRepository;
import com.gwangjubob.livealone.backend.dto.Deal.DealCommentDto;
import com.gwangjubob.livealone.backend.dto.Deal.DealDto;
import com.gwangjubob.livealone.backend.mapper.DealCommentMapper;
import com.gwangjubob.livealone.backend.mapper.DealMapper;
import com.gwangjubob.livealone.backend.service.DealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class DealServiceImpl implements DealService {
    private DealRepository dealRepository;
    private DealMapper dealMapper;
    private UserRepository userRepository;

    private DealCommentRepository dealCommentRepository;
    private DealCommentMapper dealCommentMapper;
    @Autowired
    DealServiceImpl(DealRepository dealRepository, DealMapper dealMapper, UserRepository userRepository, DealCommentRepository dealCommentRepository, DealCommentMapper dealCommentMapper){
        this.dealRepository = dealRepository;
        this.dealMapper = dealMapper;
        this.userRepository = userRepository;
        this.dealCommentRepository = dealCommentRepository;
        this.dealCommentMapper = dealCommentMapper;
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
            List<DealCommentEntity> comments = dealCommentRepository.findByDeal(deal);
            List<DealCommentDto> commentDto = dealCommentMapper.toDtoList(comments);
            data = dealMapper.toDto(deal);
            data.setComments(commentDto);
            return data;
        } else{
            data = null;
        }
        return data;
    }

    @Override
    public DealDto updateDeal(Integer idx, DealDto dealDto) {
        Optional<DealEntity> optionalDeal = dealRepository.findById(idx);
        DealDto data = new DealDto();
        if(optionalDeal.isPresent()){
            DealEntity deal = optionalDeal.get();
            dealMapper.updateFromDto(dealDto, deal);
            deal.setUpdateTime(LocalDateTime.now());
            DealEntity res =dealRepository.save(deal);
            data = dealMapper.toDto(res);
            return data;
        } else {
            data = null;
        }
        return data;
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

    @Override
    public DealCommentDto registDealComment(DealCommentDto dealCommentDto) {
        Optional<UserEntity> optionalUser = userRepository.findByNickname(dealCommentDto.getUserNickname());
        DealCommentDto data = new DealCommentDto();
        if(optionalUser.isPresent()){
            UserEntity user = optionalUser.get();
            DealCommentEntity deal = dealCommentMapper.toEntity(dealCommentDto);
            deal.setUser(user);
            dealCommentRepository.save(deal);
            data = dealCommentMapper.toDto(deal);
            data.setUserNickname(deal.getUser().getNickname());
        } else{
            data = null;
        }
        return data;
    }

    @Override
    public DealCommentDto updateDealComment(Integer idx, DealCommentDto dealCommentDto) {
        return null;
    }

    @Override
    public boolean deleteDealComment(Integer idx) {
        return false;
    }
}
