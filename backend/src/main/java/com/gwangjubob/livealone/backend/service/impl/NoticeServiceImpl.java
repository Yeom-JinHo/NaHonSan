package com.gwangjubob.livealone.backend.service.impl;

import com.gwangjubob.livealone.backend.domain.entity.NoticeEntity;
import com.gwangjubob.livealone.backend.domain.entity.UserEntity;
import com.gwangjubob.livealone.backend.domain.repository.NoticeRepository;
import com.gwangjubob.livealone.backend.dto.notice.NoticeReadDto;
import com.gwangjubob.livealone.backend.dto.notice.NoticeViewDto;
import com.gwangjubob.livealone.backend.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NoticeServiceImpl implements NoticeService {

    private NoticeRepository noticeRepository;
    private UserEntity userEntity;

    @Autowired
    NoticeServiceImpl(NoticeRepository noticeRepository, UserEntity userEntity){
        this.noticeRepository = noticeRepository;
        this.userEntity = userEntity;
    }

    @Override
    public List<NoticeViewDto> viewNotice(String id) {
        List<NoticeEntity> notices = noticeRepository.findByUserId(id);
        List<NoticeViewDto> result = new ArrayList<>();

        // 내정보조회
        Boolean like_notice;
        Boolean follow_notice;
        Boolean comment_notice;
        Boolean reply_notice;

        for(NoticeEntity n : notices){
            NoticeViewDto tmp = new NoticeViewDto();
            tmp.setIdx(n.getIdx());
            tmp.setNoticeType(n.getNoticeType());
            tmp.setFromUserId(n.getFromUserId());
            tmp.setPostIdx(n.getPostIdx());
            tmp.setRead(n.getRead());
            tmp.setTime(n.getTime());
            tmp.setPostType(n.getPostType());

            result.add(tmp);
        }


       return result;
    }

    @Override
    public void deleteNotice(String id, int idx) {
        noticeRepository.deleteByuserIdandIdx(id,idx);
    }

    @Override
    public NoticeReadDto readNotice(String decodeId, int idx) {
        return null;
    }

}
