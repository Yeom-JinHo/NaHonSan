package com.gwangjubob.livealone.backend.dto.Deal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DealCommentDto {
    private String userId;
    private Integer postIdx;
    private String content;
    private String category;
    private String bannerImg;
    private String state;
    private String area;
    private Integer view;
}
