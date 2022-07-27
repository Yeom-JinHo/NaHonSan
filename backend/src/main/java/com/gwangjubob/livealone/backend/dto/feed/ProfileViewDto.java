package com.gwangjubob.livealone.backend.dto.feed;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileViewDto {
    private String id;
    private String nickname;
    private String profileMsg;
    private byte[] profileImg;
    private int followCount;
    private int followerCount;


}


