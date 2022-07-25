package com.gwangjubob.livealone.backend.service.impl;

import com.gwangjubob.livealone.backend.domain.entity.TipEntity;
import com.gwangjubob.livealone.backend.domain.entity.UserEntity;
import com.gwangjubob.livealone.backend.domain.repository.TipRepository;
import com.gwangjubob.livealone.backend.dto.tip.TipCreateDto;
import com.gwangjubob.livealone.backend.dto.tip.TipViewDto;
import com.gwangjubob.livealone.backend.dto.user.UserInfoDto;
import com.gwangjubob.livealone.backend.mapper.UserInfoMapper;
import com.gwangjubob.livealone.backend.service.TipService;
import com.gwangjubob.livealone.backend.service.UserService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TipServiceImpl implements TipService {
    private TipRepository tipRepository;
    private UserService userService;
    private UserInfoMapper userInfoMapper;

    public TipServiceImpl(TipRepository tipRepository, UserService userService, UserInfoMapper userInfoMapper){
        this.tipRepository = tipRepository;
        this.userService = userService;
        this.userInfoMapper = userInfoMapper;
    }
    @Override
    public void createTip(String decodeId, TipCreateDto tipCreateDto) {

        UserInfoDto userInfo = userService.infoUser(decodeId);
        UserEntity user = userInfoMapper.toEntity(userInfo);

        TipEntity tip = TipEntity.builder()
                .user(user)
                .category(tipCreateDto.getCategory())
                .title(tipCreateDto.getTitle())
                .content(tipCreateDto.getContent())
                .bannerImg(tipCreateDto.getBannerImg())
                .build();

        tipRepository.save(tip);
    }

    @Override
    public List<TipViewDto> viewTip(String category) {
        List<TipEntity> tipEntity = tipRepository.findByCategory(category);
        List<TipViewDto> result = new ArrayList<>();

        for(TipEntity t : tipEntity){
            TipViewDto tmp = new TipViewDto();
            tmp.setIdx(t.getIdx());
            tmp.setUser(t.getUser());
            tmp.setUserId(t.getUser().getId());
            tmp.setTitle(t.getTitle());
            tmp.setBannerImg(t.getBannerImg());

            tmp.setLikeCnt(0);
            tmp.setCommentCnt(0);
            tmp.setViewCnt(0);
            result.add(tmp);
        }
        return result;
    }
}
