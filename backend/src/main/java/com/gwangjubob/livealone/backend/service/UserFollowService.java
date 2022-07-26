package com.gwangjubob.livealone.backend.service;

import com.gwangjubob.livealone.backend.dto.user.UserInfoDto;
import com.gwangjubob.livealone.backend.dto.user.UserLoginDto;
import com.gwangjubob.livealone.backend.dto.user.UserMoreDTO;
import com.gwangjubob.livealone.backend.dto.user.UserRegistDto;

import java.util.List;

public interface UserFollowService {
    boolean registFollow(String toId, String fromId);
    List<String> listFollow(String id);
    List<String> listFollower(String id);
    boolean deleteFollow(String toId, String fromId);
}
