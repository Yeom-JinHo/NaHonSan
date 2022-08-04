package com.gwangjubob.livealone.backend.controller;

import com.gwangjubob.livealone.backend.dto.mail.MailCheckDto;
import com.gwangjubob.livealone.backend.dto.mail.MailSendDto;
import com.gwangjubob.livealone.backend.dto.user.UserMoreDTO;
import com.gwangjubob.livealone.backend.dto.user.UserRegistDto;
import com.gwangjubob.livealone.backend.dto.user.UserInfoDto;
import com.gwangjubob.livealone.backend.service.JwtService;
import com.gwangjubob.livealone.backend.service.KakaoAuthService;
import com.gwangjubob.livealone.backend.service.impl.MailService;
import com.gwangjubob.livealone.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.gwangjubob.livealone.backend.dto.user.UserLoginDto;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
public class SocialController {
    private static final String okay = "SUCCESS";
    private static final String fail = "FAIL";
    private static final String timeOut = "access-token timeout";
    private final UserService userService;
    private final JwtService jwtService;
    private final KakaoAuthService kakaoAuthService;
    private final MailService mailService;
    private static HttpStatus status = HttpStatus.NOT_FOUND;
    private static Map<String, Object> resultMap;
    @Autowired
    SocialController(UserService userService ,KakaoAuthService kakaoAuthService,JwtService jwtService,MailService mailService){
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.kakaoAuthService = kakaoAuthService;
    }

    @PostMapping("/kakao")
    public ResponseEntity<?> authKakao(HttpServletRequest request ,HttpServletResponse response) throws Exception{
        resultMap = new HashMap<>();
        String authToken = request.getHeader("authToken");
        try {
            kakaoAuthService.login(authToken);
//            String accessToken = jwtService.createAccessToken("id", userLoginDto.getId());
//            String refreshToken = jwtService.createRefreshToken("id", userLoginDto.getId());
//            resultMap.put("access-token", accessToken);
            resultMap.put("message", okay);

//            Cookie refreshCookie = new Cookie("refresh-token",refreshToken);
//            refreshCookie.setMaxAge(1*60*60);
//            refreshCookie.setPath("/");
//            refreshCookie.setHttpOnly(true);
//
//            response.addCookie(refreshCookie);
        } catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
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

