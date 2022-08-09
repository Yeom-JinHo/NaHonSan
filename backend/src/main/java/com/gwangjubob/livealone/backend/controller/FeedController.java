package com.gwangjubob.livealone.backend.controller;


import com.gwangjubob.livealone.backend.dto.Deal.DealDto;
import com.gwangjubob.livealone.backend.dto.feed.FollowViewDto;
import com.gwangjubob.livealone.backend.dto.feed.PopularFollowDto;
import com.gwangjubob.livealone.backend.dto.feed.PostViewDto;
import com.gwangjubob.livealone.backend.dto.feed.ProfileViewDto;
import com.gwangjubob.livealone.backend.dto.tip.TipViewDto;
import com.gwangjubob.livealone.backend.dto.user.UserInfoDto;
import com.gwangjubob.livealone.backend.service.JwtService;
import com.gwangjubob.livealone.backend.service.UserFeedService;
import com.gwangjubob.livealone.backend.service.UserService;
import com.gwangjubob.livealone.backend.service.impl.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class FeedController {
    private static final String okay = "SUCCESS";
    private static final String fail = "FAIL";
    private static final String timeOut = "access-token timeout";
    private static final String notAllowed = "notAllowed";
    private final UserService userService;
    private final JwtService jwtService;
    private final MailService mailService;
    private static HttpStatus status = HttpStatus.NOT_FOUND;
    private static Map<String, Object> resultMap;
    private final UserFeedService userFeedService;
    @Autowired
    FeedController(UserService userService , UserFeedService userFeedService, JwtService jwtService, MailService mailService){
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.userFeedService = userFeedService;
    }

    @PostMapping("/api/userFeed/follow/{nickname}")
    public ResponseEntity<?> registFollow(@PathVariable("nickname")String fromNickname, HttpServletRequest request){
        resultMap = new HashMap<>();
        String decodeId = checkToken(request);
        if(decodeId != null){
            String fromId = userService.NicknameToId(fromNickname);
            userFeedService.registFollow(decodeId,fromId);
            resultMap.put("result",okay);
            status = HttpStatus.OK;
        }else {
            resultMap.put("result",fail);
            status = HttpStatus.UNAUTHORIZED;
        }


        return new ResponseEntity<>(resultMap,status);
    }
    @DeleteMapping("/api/userFeed/follow/{nickname}")
    public ResponseEntity<?> deleteFollow(@PathVariable("nickname")String fromNickname, HttpServletRequest request){
        resultMap = new HashMap<>();
        String decodeId = checkToken(request);
        if(decodeId != null){
            String fromId = userService.NicknameToId(fromNickname);
            userFeedService.deleteFollow(decodeId,fromId);
            resultMap.put("result",okay);
            status = HttpStatus.OK;
        }else {
            resultMap.put("result",fail);
            status = HttpStatus.UNAUTHORIZED;
        }


        return new ResponseEntity<>(resultMap,status);
    }
    @GetMapping("/api/userFeed/follow/{nickname}")
    public ResponseEntity<?> listFollow(@PathVariable("nickname")String fromNickname){
        resultMap = new HashMap<>();
        try{
            String fromId = userService.NicknameToId(fromNickname);
            UserInfoDto userInfoDto =  userService.infoUser(fromId);
            if(userInfoDto.getFollowOpen()) {// 대상 id가 팔로우 설정이 되어있다면 조회하기
                List<FollowViewDto> result = userFeedService.listFollow(fromId);
                resultMap.put("data",result);
            }else{
                resultMap.put("data",notAllowed);
            }
            resultMap.put("result",okay);
            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("result",fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap,status);
    }
    @GetMapping("/api/userFeed/follower/{nickname}")
    public ResponseEntity<?> listFollower(@PathVariable("nickname")String fromNickname){
        resultMap = new HashMap<>();
        try{
            String fromId = userService.NicknameToId(fromNickname);
            UserInfoDto userInfoDto =  userService.infoUser(fromId);
            if(userInfoDto.getFollowerOpen()){// 대상 id가 팔로워 설정이 되어있다면 조회하기
                List<FollowViewDto> result = userFeedService.listFollower(fromId);
                resultMap.put("data",result);
            }else{
                resultMap.put("data",notAllowed);
            }
            resultMap.put("result",okay);
            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("result",fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap,status);
    }
    @GetMapping("/api/userFeed/follow/search/{nickname}")
    public ResponseEntity<?> searchFollow(@PathVariable("nickname")String fromNickname, @RequestParam("keyword") String keyword){
        resultMap = new HashMap<>();
        try{
            String fromId = userService.NicknameToId(fromNickname);
            UserInfoDto userInfoDto =  userService.infoUser(fromId);
            if(userInfoDto.getFollowerOpen()){// 대상 id가 팔로워 설정이 되어있다면 조회하기
                List<FollowViewDto> result = userFeedService.searchFollow(fromId,keyword);
                resultMap.put("data",result);
            }else{
                resultMap.put("data",notAllowed);
            }
            resultMap.put("result",okay);
            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("result",fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap,status);
    }
    @GetMapping("/api/userFeed/follower/search/{nickname}")
    public ResponseEntity<?> searchFollower(@PathVariable("nickname")String fromNickname, @RequestParam("keyword") String keyword){
        resultMap = new HashMap<>();
        try{
            String fromId = userService.NicknameToId(fromNickname);
            UserInfoDto userInfoDto =  userService.infoUser(fromId);
            if(userInfoDto.getFollowerOpen()){// 대상 id가 팔로워 설정이 되어있다면 조회하기
                List<FollowViewDto> result = userFeedService.searchFollower(fromId,keyword);
                resultMap.put("data",result);
            }else{
                resultMap.put("data",notAllowed);
            }
            resultMap.put("result",okay);
            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("result",fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap,status);
    }
    @GetMapping("/api/userFeed/profile/{nickname}")
    public ResponseEntity<?> feedProfile(@PathVariable("nickname")String fromNickname){
        resultMap = new HashMap<>();
        try{
            String fromId = userService.NicknameToId(fromNickname);
            ProfileViewDto result = userFeedService.feedProfile(fromId);
            if(result != null) {
                resultMap.put("data", result);
                resultMap.put("result", okay);
            }
            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("result",fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap,status);
    }

    @GetMapping("/api/userFeed/post/{nickname}")
    public ResponseEntity<?> feedPosts(@PathVariable("nickname")String fromNickname, @RequestParam("category") int category){
        resultMap = new HashMap<>();
        try{
            String fromId = userService.NicknameToId(fromNickname);
            List<PostViewDto> result = userFeedService.feedPosts(fromId,category);
            if(result != null){
                resultMap.put("data",result);
                resultMap.put("result",okay);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("result",fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap,status);
    }
    @GetMapping("/api/mainFeed/user")
    public ResponseEntity<?> popularFollower(){
        resultMap = new HashMap<>();
        try{

            List<PopularFollowDto> result = userFeedService.popularFollower();
            if(result != null){
                resultMap.put("data",result);
                resultMap.put("result",okay);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("result",fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap,status);
    }
    @GetMapping("/api/mainFeed/honeyDeal")
    public ResponseEntity<?> popularHoneyDeal(HttpServletRequest request){
        resultMap = new HashMap<>();
        String decodeId = checkToken(request);
        try{
            if(decodeId != null){
                List<DealDto> result = userFeedService.popularHoneyDeal(decodeId);
                resultMap.put("data",result);

            }
            resultMap.put("result",okay);
            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("result",fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap,status);
    }
    @GetMapping("/api/mainFeed/honeyTip")
    public ResponseEntity<?> userFollowHoneyTip(@RequestParam("lastIdx")Integer lastIdx,@RequestParam("pageSize") int pageSize, HttpServletRequest request){
        resultMap = new HashMap<>();
        String decodeId = checkToken(request);
        try{
            if(decodeId != null){
                Map result = userFeedService.userFollowHoneyTip(decodeId,lastIdx, pageSize);
                resultMap.put("data",result);

            }
            resultMap.put("result",okay);
            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("result",fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap,status);
    }
    public String checkToken(HttpServletRequest request){
        String accessToken = request.getHeader("Authorization");
        String decodeId = jwtService.decodeToken(accessToken);
        if(!decodeId.equals("timeout")){
            return decodeId;
        }else{
            resultMap.put("message", timeOut);
            status = HttpStatus.UNAUTHORIZED;
            return null;
        }
    }
}
