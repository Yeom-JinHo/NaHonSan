package com.gwangjubob.livealone.backend.controller;

import com.gwangjubob.livealone.backend.dto.tip.TipCreateDto;
import com.gwangjubob.livealone.backend.service.JwtService;
import com.gwangjubob.livealone.backend.service.TipService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
public class TipController {
    private TipService tipService;
    private JwtService jwtService;

    private static final String okay = "SUCCESS";
    private static final String fail = "FAIL";
    private static final String timeOut = "access-token timeout";
    private static HttpStatus status = HttpStatus.NOT_FOUND;
    private static Map<String, Object> resultMap;

    public TipController(TipService tipService, JwtService jwtService){
        this.tipService = tipService;
        this.jwtService = jwtService;
    }

    @PostMapping("/HoneyTip")
    public ResponseEntity<?> createTip(HttpServletRequest request, @RequestBody TipCreateDto tipCreateDto){
        resultMap = new HashMap<>();
        String decodeId = checkToken(request);

        if(decodeId != null){
            try{
                tipService.createTip(decodeId, tipCreateDto);
                resultMap.put("message", okay);
                status = HttpStatus.OK;
            }catch(Exception e){
                resultMap.put("message", fail);
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
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
