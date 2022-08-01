package com.gwangjubob.livealone.backend.service.impl;

import com.gwangjubob.livealone.backend.domain.entity.NoticeEntity;
import com.gwangjubob.livealone.backend.domain.entity.TipEntity;
import com.gwangjubob.livealone.backend.domain.entity.UserEntity;
import com.gwangjubob.livealone.backend.domain.entity.UserLikeTipsEntity;
import com.gwangjubob.livealone.backend.domain.repository.NoticeRepository;
import com.gwangjubob.livealone.backend.domain.repository.TipRepository;
import com.gwangjubob.livealone.backend.domain.repository.UserLikeTipsRepository;
import com.gwangjubob.livealone.backend.domain.repository.UserRepository;
import com.gwangjubob.livealone.backend.dto.tip.TipCreateDto;
import com.gwangjubob.livealone.backend.dto.tip.TipDetailViewDto;
import com.gwangjubob.livealone.backend.dto.tip.TipUpdateDto;
import com.gwangjubob.livealone.backend.dto.tip.TipViewDto;
import com.gwangjubob.livealone.backend.dto.user.UserInfoDto;
import com.gwangjubob.livealone.backend.mapper.TipCreateMapper;
import com.gwangjubob.livealone.backend.mapper.TipDetailViewMapper;
import com.gwangjubob.livealone.backend.mapper.TipUpdateMapper;
import com.gwangjubob.livealone.backend.mapper.UserInfoMapper;
import com.gwangjubob.livealone.backend.service.TipService;
import com.gwangjubob.livealone.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TipServiceImpl implements TipService {
    private TipRepository tipRepository;
    private UserRepository userRepository;
    private NoticeRepository noticeRepository;
    private TipCreateMapper tipCreateMapper;
    private TipUpdateMapper tipUpdateMapper;
    private TipDetailViewMapper tipDetailViewMapper;
    private UserLikeTipsRepository userLikeTipsRepository;

    @Autowired
    public TipServiceImpl(TipRepository tipRepository, NoticeRepository noticeRepository, UserRepository userRepository,
                          TipCreateMapper tipCreateMapper, TipUpdateMapper tipUpdateMapper, TipDetailViewMapper tipDetailViewMapper,
                          UserLikeTipsRepository userLikeTipsRepository){
        this.tipRepository = tipRepository;
        this.userRepository = userRepository;
        this.tipCreateMapper = tipCreateMapper;
        this.tipUpdateMapper = tipUpdateMapper;
        this.tipDetailViewMapper = tipDetailViewMapper;
        this.userLikeTipsRepository = userLikeTipsRepository;
        this.noticeRepository = noticeRepository;
    }
    @Override
    public void createTip(String decodeId, TipCreateDto tipCreateDto) {
        UserEntity user = userRepository.findById(decodeId).get();

        TipCreateDto dto = TipCreateDto.builder()
                .userNickname(user.getNickname())
                .category(tipCreateDto.getCategory())
                .title(tipCreateDto.getTitle())
                .content(tipCreateDto.getContent())
                .bannerImg(tipCreateDto.getBannerImg())
                .build();

        TipEntity tipEntity = tipCreateMapper.toEntity(dto);
        tipEntity.setUser(user);

        tipRepository.save(tipEntity);
    }

    @Override
    public List<TipViewDto> viewTip(String category) {
        List<TipEntity> tipEntity = tipRepository.findByCategory(category);
        List<TipViewDto> result = new ArrayList<>();

        for(TipEntity t : tipEntity){
            TipViewDto dto = TipViewDto.builder()
                    .idx(t.getIdx())
                    .userNickname(t.getUser().getNickname())
                    .userProfileImg(t.getUser().getProfileImg())
                    .title(t.getTitle())
                    .bannerImg(t.getBannerImg())
                    .view(t.getView())
                    .like(t.getLike())
                    .comment(t.getComment())
                    .build();

            result.add(dto);
        }
        return result;

    }

    @Override
    public void updateTip(String decodeId, TipUpdateDto tipUpdateDto, Integer idx) {
        Optional<TipEntity> optionalTip = tipRepository.findByIdx(idx);
        UserEntity user = userRepository.findById(decodeId).get();

        if(optionalTip.isPresent()){
            TipEntity tip = optionalTip.get();
            if(user.getNickname().equals(tip.getUser().getNickname())){
                tipUpdateMapper.updateFromDto(tipUpdateDto, tip);
                tip.setUpdateTime(LocalDateTime.now());
                tipRepository.save(tip);
            }
        }
    }

    @Override
    public void deleteTip(String decodeId, Integer idx) {
        TipEntity tip = tipRepository.findByIdx(idx).get();
        UserEntity user = userRepository.findById(decodeId).get();
        if(user.getNickname().equals(tip.getUser().getNickname())){
            tipRepository.delete(tip);
        }
    }

    @Override
    public TipDetailViewDto detailViewTip(Integer idx) {
        Optional<TipEntity> optionalTipEntity = tipRepository.findByIdx(idx);

        if(optionalTipEntity.isPresent()){
            TipEntity tipEntity = optionalTipEntity.get();
            tipEntity.setView(tipEntity.getView() + 1);
            tipRepository.save(tipEntity);

            TipDetailViewDto tipDto = tipDetailViewMapper.toDto(tipEntity);

            tipDto.setUserNickname(tipEntity.getUser().getNickname());
            tipDto.setUserProfileImg(tipEntity.getUser().getProfileImg());

            return tipDto;
        }

        return null;
    }

    @Override
    public void likeTip(String decodeId, Integer idx) {
        UserEntity userEntity = userRepository.findById(decodeId).get();
        TipEntity tipEntity = tipRepository.findByIdx(idx).get();

        Optional<UserLikeTipsEntity> userLikeTipsEntity = userLikeTipsRepository.findByUserAndTip(userEntity, tipEntity);

        if(userLikeTipsEntity.isPresent()){
            UserLikeTipsEntity userLikeTip = userLikeTipsEntity.get();
            userLikeTipsRepository.delete(userLikeTipsEntity.get());

            tipEntity.setLike(tipEntity.getLike() - 1);
            tipRepository.save(tipEntity);

            NoticeEntity noticeEntity = noticeRepository.findByNoticeTypeAndFromUserIdAndPostTypeAndPostIdx("like", userEntity.getId(), "tip", tipEntity.getIdx());
            if(noticeEntity != null){
                noticeRepository.delete(noticeEntity);
            }
        }else{
            UserLikeTipsEntity likeTipsEntity = UserLikeTipsEntity.builder()
                    .tip(tipEntity)
                    .user(userEntity)
                    .time(LocalDateTime.now())
                    .build();

            userLikeTipsRepository.save(likeTipsEntity);

            tipEntity.setLike(tipEntity.getLike() + 1);
            tipRepository.save(tipEntity);

            if(!tipEntity.getUser().getId().equals(userEntity.getId())){
                NoticeEntity noticeEntity = NoticeEntity.builder()
                        .noticeType("like")
                        .user(tipEntity.getUser())
                        .fromUserId(userEntity.getId())
                        .postType("tip")
                        .postIdx(tipEntity.getIdx())
                        .build();

                noticeRepository.save(noticeEntity);
            }
        }
    }

}
