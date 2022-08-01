package com.gwangjubob.livealone.backend.service.impl;


import com.gwangjubob.livealone.backend.domain.entity.*;
import com.gwangjubob.livealone.backend.domain.repository.*;
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
    private UserLikeDealsRepository userLikeDealsRepository;
    private NoticeRepository noticeRepository;
    private DealCommentMapper dealCommentMapper;
    @Autowired
    DealServiceImpl(DealRepository dealRepository, DealMapper dealMapper, UserRepository userRepository, DealCommentRepository dealCommentRepository,
                    NoticeRepository noticeRepository, DealCommentMapper dealCommentMapper, UserLikeDealsRepository userLikeDealsRepository){
        this.dealRepository = dealRepository;
        this.dealMapper = dealMapper;
        this.userRepository = userRepository;
        this.dealCommentRepository = dealCommentRepository;
        this.dealCommentMapper = dealCommentMapper;
        this.userLikeDealsRepository = userLikeDealsRepository;
        this.noticeRepository = noticeRepository;
    }


    @Override
    public DealDto registDeal(DealDto dealDto) {
        Optional<UserEntity> optionalUser = userRepository.findById(dealDto.getUserId());
        DealDto data = new DealDto();
        if(optionalUser.isPresent()){
            UserEntity user = optionalUser.get();
            DealEntity deal = dealMapper.toEntity(dealDto);
            deal.setUser(user);
            dealRepository.save(deal);
            data = dealMapper.toDto(deal);
            data.setUserNickname(deal.getUser().getNickname());
            data.setUserId(deal.getUser().getId());
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
            data.setUserNickname(deal.getUser().getNickname());
            data.setUserId(deal.getUser().getId());
        } else{
            data = null;
        }
        return data;
    }

    @Override
    public List<DealDto> viewDeal(String category) {
        List<DealEntity> deals = dealRepository.findByCategory(category);
        List<DealDto> data = new ArrayList<>();
        if(deals != null){
            data = dealMapper.toDtoList(deals);
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
        Optional<UserEntity> optionalUser = userRepository.findById(dealCommentDto.getUserId());
        Optional<DealEntity> optionalDeal = dealRepository.findById(dealCommentDto.getPostIdx());
        DealCommentDto data = new DealCommentDto();
        if(optionalUser.isPresent() && optionalDeal.isPresent()){
            UserEntity user = optionalUser.get();
            DealEntity deal = optionalDeal.get();
            DealCommentEntity dealComment = dealCommentMapper.toEntity(dealCommentDto);
            dealComment.setUser(user);
            dealComment.setDeal(deal);
            dealCommentRepository.save(dealComment);
            data = dealCommentMapper.toDto(dealComment);
            data.setUserNickname(dealComment.getUser().getNickname());
            data.setUserId(dealComment.getUser().getId());
            data.setPostIdx(dealComment.getDeal().getIdx());
        } else{
            data = null;
        }
        return data;
    }

    @Override
    public DealCommentDto updateDealComment(Integer idx, DealCommentDto dealCommentDto) {
        Optional<DealCommentEntity> optionalDealComment = dealCommentRepository.findById(idx);
        DealCommentDto data = new DealCommentDto();
        if(optionalDealComment.isPresent()){
            DealCommentEntity dealComment = optionalDealComment.get();
            dealCommentMapper.updateFromDto(dealCommentDto, dealComment);
            dealCommentRepository.save(dealComment);
            data = dealCommentMapper.toDto(dealComment);
            data.setUserNickname(dealComment.getUser().getNickname());
        } else{
            data = null;
        }
        return data;
    }

    @Override
    public boolean deleteDealComment(Integer idx) {
        Optional<DealCommentEntity> optionalDealComment = dealCommentRepository.findById(idx);
        if(optionalDealComment.isPresent()){
            DealCommentEntity dealComment = optionalDealComment.get();
            dealCommentRepository.delete(dealComment);
            return true;
        } else{
            return false;
        }
    }

    @Override
    public boolean likeDeal(Integer idx, String userId) {
        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        Optional<DealEntity> optionalDeal = dealRepository.findById(idx);
        if(optionalUser.isPresent() && optionalDeal.isPresent()){
            UserEntity user = optionalUser.get();
            DealEntity deal = optionalDeal.get();
            Optional<UserLikeDealsEntity> optionalUserLikeDeals = userLikeDealsRepository.findByDealAndUser(deal, user);
            if (optionalUserLikeDeals.isPresent()){
                UserLikeDealsEntity userLikeDeals = optionalUserLikeDeals.get();
                userLikeDealsRepository.delete(userLikeDeals);
                deal.setLikes(deal.getLikes() - 1);
                dealRepository.save(deal);

                // 좋아요 취소 누르면 알림까지 삭제
                NoticeEntity noticeEntity = noticeRepository.findByNoticeTypeAndFromUserIdAndPostTypeAndPostIdx("like",user.getId(),"deal",deal.getIdx());
                if(noticeEntity != null){
                    noticeRepository.delete(noticeEntity);
                }
            } else{
                UserLikeDealsEntity userLikeDeals = UserLikeDealsEntity
                        .builder()
                        .deal(deal)
                        .user(user)
                        .build();
                userLikeDealsRepository.save(userLikeDeals);
                deal.setLikes(deal.getLikes() + 1);
                dealRepository.save(deal);

                NoticeEntity noticeEntity = NoticeEntity.builder()
                        .noticeType("like")
                        .user(deal.getUser())
                        .fromUserId(user.getId())
                        .postType("deal")
                        .postIdx(deal.getIdx())
                        .time(userLikeDeals.getTime())
                        .build();

                noticeRepository.save(noticeEntity);
            }
            return true;
        } else{
            return false;
        }

    }
}
