package com.gwangjubob.livealone.backend.dto.feed;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FollowListDto {
    private String to;
    private String type;
    private String number;
}


