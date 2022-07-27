package com.gwangjubob.livealone.backend.dto.Deal;


import com.gwangjubob.livealone.backend.domain.entity.DealCommentEntity;
import com.gwangjubob.livealone.backend.domain.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.PropertyValue;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DealDto {
    private String userNickname;
    private String title;
    private String content;
    private String category;
    private byte[] bannerImg;
    private String state;
    private String area;
    private Integer view;
    private Integer likes;
    private Integer comment;
    private List<DealCommentDto> comments;
}
