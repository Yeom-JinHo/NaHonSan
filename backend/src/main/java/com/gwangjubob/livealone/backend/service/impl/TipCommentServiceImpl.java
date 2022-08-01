package com.gwangjubob.livealone.backend.service.impl;

import com.gwangjubob.livealone.backend.domain.entity.NoticeEntity;
import com.gwangjubob.livealone.backend.domain.entity.TipCommentEntity;
import com.gwangjubob.livealone.backend.domain.entity.TipEntity;
import com.gwangjubob.livealone.backend.domain.entity.UserEntity;
import com.gwangjubob.livealone.backend.domain.repository.NoticeRepository;
import com.gwangjubob.livealone.backend.domain.repository.TipCommentRepository;
import com.gwangjubob.livealone.backend.domain.repository.TipRepository;
import com.gwangjubob.livealone.backend.domain.repository.UserRepository;
import com.gwangjubob.livealone.backend.dto.tipcomment.TipCommentCreateDto;
import com.gwangjubob.livealone.backend.dto.tipcomment.TipCommentUpdateDto;
import com.gwangjubob.livealone.backend.dto.tipcomment.TipCommentViewDto;
import com.gwangjubob.livealone.backend.service.TipCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.OpAnd;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TipCommentServiceImpl implements TipCommentService {

    private UserRepository userRepository;
    private TipCommentRepository tipCommentRepository;
    private TipRepository tipRepository;
    private NoticeRepository noticeRepository;


    @Autowired
    public TipCommentServiceImpl(UserRepository userRepository, TipCommentRepository tipCommentRepository,
                                 NoticeRepository noticeRepository, TipRepository tipRepository){
        this.userRepository = userRepository;
        this.tipCommentRepository = tipCommentRepository;
        this.tipRepository = tipRepository;
        this.noticeRepository = noticeRepository;
    }
    @Override
    public void createTipComment(String decodeId, TipCommentCreateDto requestDto) {
        UserEntity user = userRepository.findById(decodeId).get();
        TipEntity tip = tipRepository.findByIdx(requestDto.getPostIdx()).get(); // 게시글 정보

        TipCommentEntity entity = TipCommentEntity.builder()
                .user(user)
                .tip(tip)
                .upIdx(requestDto.getUpIdx())
                .content(requestDto.getContent())
                .bannerImg(requestDto.getBannerImg())
                .build();

        tipCommentRepository.save(entity);

        tip.setComment(tip.getComment() + 1);
        tipRepository.save(tip);

        if(!tip.getUser().getId().equals(user.getId())){
            if(entity.getUpIdx() == 0){
                NoticeEntity noticeEntity = NoticeEntity.builder()
                        .noticeType("comment")
                        .user(tip.getUser())
                        .fromUserId(user.getId())
                        .postType("tip")
                        .postIdx(tip.getIdx())
                        .build();

                noticeRepository.save(noticeEntity);
            }else{
                NoticeEntity noticeEntity = NoticeEntity.builder()
                        .noticeType("reply")
                        .user(tip.getUser())
                        .fromUserId(user.getId())
                        .postType("tip")
                        .postIdx(tip.getIdx())
                        .build();

                noticeRepository.save(noticeEntity);
            }
        }
    }

    @Override
    public void updateTipComment(String decodeId, Integer idx, TipCommentUpdateDto requestDto) {

        Optional<TipCommentEntity> optionalTipComment = tipCommentRepository.findByIdx(idx);

        if(optionalTipComment.isPresent()){
            TipCommentEntity tipComment = optionalTipComment.get();
            UserEntity user = userRepository.findById(decodeId).get();
            TipEntity tip = tipRepository.findByIdx(tipComment.getTip().getIdx()).get(); // 게시글 정보

            TipCommentEntity updateTipComment = TipCommentEntity.builder()
                    .idx(idx)
                    .user(user)
                    .tip(tip)
                    .upIdx(tipComment.getUpIdx())
                    .content(requestDto.getContent())
                    .bannerImg(requestDto.getBannerImg())
                    .time(tipComment.getTime())
                    .updateTime(LocalDateTime.now())
                    .build();

            tipCommentRepository.saveAndFlush(updateTipComment);
        }

    }

    @Override
    public List<TipCommentViewDto> viewTipComment(Integer idx) {
        TipEntity tipEntity = tipRepository.findByIdx(idx).get();
        List<TipCommentEntity> tipCommentEntity = tipCommentRepository.findByTip(tipEntity);
        List<TipCommentViewDto> result = new ArrayList<>();

        for(TipCommentEntity t : tipCommentEntity){
            TipCommentViewDto dto = TipCommentViewDto.builder()
                    .idx(t.getIdx())
                    .upIdx(t.getUpIdx())
                    .userProfileImg(t.getUser().getProfileImg())
                    .userNickname(t.getUser().getNickname())
                    .content(t.getContent())
                    .bannerImg(t.getBannerImg())
                    .time(t.getTime())
                    .updateTime(t.getUpdateTime())
                    .build();

            result.add(dto);
        }

        return result;
    }

    @Override
    public void deleteTipComment(String decodeId, Integer idx) {
        UserEntity user = userRepository.findById(decodeId).get();
        Optional<TipCommentEntity> optionalTipCommentEntity = tipCommentRepository.findByIdx(idx);

        if(optionalTipCommentEntity.isPresent()){
            TipCommentEntity tipComment = optionalTipCommentEntity.get();
            TipEntity tipEntity = tipRepository.findByIdx(tipComment.getTip().getIdx()).get();

            if(user.getNickname().equals(tipComment.getUser().getNickname())){
                if(tipComment.getUpIdx() != 0){
                    tipEntity.setComment(tipEntity.getComment() - 1);
                    tipRepository.save(tipEntity);

                    tipCommentRepository.delete(tipComment);

                    NoticeEntity noticeEntity = noticeRepository.findByNoticeTypeAndFromUserIdAndPostTypeAndPostIdx("reply", user.getId(), "tip", tipEntity.getIdx());
                    noticeRepository.delete(noticeEntity);
                }else{
                    List<TipCommentEntity> replyCommentList = tipCommentRepository.findByUpIdx(idx);
                    int size = replyCommentList.size();

                    if(!replyCommentList.isEmpty()){
                        tipEntity.setComment(tipEntity.getComment() - size - 1);
                        tipRepository.save(tipEntity);

                        tipCommentRepository.deleteAllInBatch(replyCommentList);

                        // 대댓글 들 알림까지 삭제
                        List<NoticeEntity> noticeEntityList = noticeRepository.findAllByNoticeTypeAndFromUserIdAndPostTypeAndPostIdx("reply", user.getId(), "tip", tipEntity.getIdx());

                        if(!noticeEntityList.isEmpty()){
                            noticeRepository.deleteAllInBatch(noticeEntityList);
                        }
                    }
                    tipCommentRepository.delete(tipComment);

                    NoticeEntity noticeEntity = noticeRepository.findByNoticeTypeAndFromUserIdAndPostTypeAndPostIdx("comment", user.getId(), "tip", tipEntity.getIdx());

                    if(noticeEntity != null){
                        noticeRepository.delete(noticeEntity);
                    }
                }
            }
        }
    }
}
