package com.gwangjubob.livealone.backend.controller;

import com.gwangjubob.livealone.backend.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DealController {

    private static final String okay = "SUCCESS";
    private static final String fail = "FAIL";
    private static final String timeOut = "access-token timeout";

    private final JwtService jwtService;
    private static HttpStatus status = HttpStatus.NOT_FOUND;
    private static Map<String, Object> resultMap;

    @Autowired
    DealController(JwtService jwtService){
        this.jwtService = jwtService;
    }
}
