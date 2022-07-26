package com.gwangjubob.livealone.backend.controller;


import com.gwangjubob.livealone.backend.dto.feed.FollowViewDto;
import com.gwangjubob.livealone.backend.service.JwtService;
import com.gwangjubob.livealone.backend.service.UserFollowService;
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
    private final UserService userService;
    private final JwtService jwtService;
    private final MailService mailService;
    private static HttpStatus status = HttpStatus.NOT_FOUND;
    private static Map<String, Object> resultMap;
    private final UserFollowService userFollowService;
    @Autowired
    FeedController(UserService userService ,UserFollowService userFollowService,JwtService jwtService,MailService mailService){
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.userFollowService = userFollowService;
    }

    @PostMapping("/userFeed/follow/{id}")
    public ResponseEntity<?> registFollow(@PathVariable("id")String fromId, HttpServletRequest request){
        resultMap = new HashMap<>();
        String decodeId = checkToken(request);
        if(decodeId != null){
            userFollowService.registFollow(decodeId,fromId);
            resultMap.put("result",okay);
            status = HttpStatus.OK;
        }else {
            resultMap.put("result",fail);
            status = HttpStatus.UNAUTHORIZED;
        }


        return new ResponseEntity<>(resultMap,status);
    }
    @DeleteMapping("/userFeed/follow/{id}")
    public ResponseEntity<?> deleteFollow(@PathVariable("id")String fromId, HttpServletRequest request){
        resultMap = new HashMap<>();
        String decodeId = checkToken(request);
        if(decodeId != null){
            userFollowService.deleteFollow(decodeId,fromId);
            resultMap.put("result",okay);
            status = HttpStatus.OK;
        }else {
            resultMap.put("result",fail);
            status = HttpStatus.UNAUTHORIZED;
        }


        return new ResponseEntity<>(resultMap,status);
    }
    @GetMapping("/userFeed/follow/{id}")
    public ResponseEntity<?> listFollow(@PathVariable("id")String fromId){
        resultMap = new HashMap<>();
        try{
            List<FollowViewDto> result = userFollowService.listFollow(fromId);
            resultMap.put("result",okay);
            resultMap.put("data",result);
            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("result",fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap,status);
    }
    @GetMapping("/userFeed/follower/{id}")
    public ResponseEntity<?> listFollower(@PathVariable("id")String fromId){
        resultMap = new HashMap<>();
        try{
            List<FollowViewDto> result = userFollowService.listFollower(fromId);
            resultMap.put("result",okay);
            resultMap.put("data",result);
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
