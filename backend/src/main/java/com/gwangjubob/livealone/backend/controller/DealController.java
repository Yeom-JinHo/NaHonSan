package com.gwangjubob.livealone.backend.controller;

import com.gwangjubob.livealone.backend.dto.Deal.DealCommentDto;
import com.gwangjubob.livealone.backend.dto.Deal.DealDto;
import com.gwangjubob.livealone.backend.service.DealService;
import com.gwangjubob.livealone.backend.service.JwtService;
import com.gwangjubob.livealone.backend.service.impl.DealServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
public class DealController {

    private static final String okay = "SUCCESS";
    private static final String fail = "FAIL";
    private static final String timeOut = "access-token timeout";

    private final JwtService jwtService;
    private final DealService dealService;
    private static HttpStatus status = HttpStatus.NOT_FOUND;
    private static Map<String, Object> resultMap;

    @Autowired
    DealController(JwtService jwtService, DealService dealService)
    {
        this.jwtService = jwtService;
        this.dealService = dealService;
    }

    @PostMapping("/honeyDeal")
    public ResponseEntity<?> registDeal(@RequestBody DealDto dealDto, HttpServletRequest request){
        resultMap = new HashMap<>();
        String decodeId = checkToken(request);
        if (decodeId != null){
            try {
                dealDto.setUserId(decodeId);
                DealDto data = dealService.registDeal(dealDto);
                if(data != null){
                    resultMap.put("data", data);
                    resultMap.put("message", okay);
                } else{
                    resultMap.put("message", fail);
                }
                status = HttpStatus.OK;
            } catch (Exception e){
                resultMap.put("message", fail);
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }
    @GetMapping("/honeyDeal/detail/{idx}")
    public ResponseEntity<?> viewDetailDeal(@PathVariable Integer idx){
        resultMap = new HashMap<>();
        try {
            DealDto data = dealService.viewDetailDeal(idx);
            if(data != null){
                resultMap.put("data", data);
                resultMap.put("message", okay);
            } else{
                resultMap.put("message", fail);
            }
            status = HttpStatus.OK;
        } catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("/honeyDeal/{idx}")
    public ResponseEntity<?> updateDeal(@PathVariable Integer idx, @RequestBody DealDto dealDto){
        resultMap = new HashMap<>();
        try {
            DealDto data = dealService.updateDeal(idx, dealDto);
            if(data != null){
                resultMap.put("data", data);
                resultMap.put("message", okay);
            } else{
                resultMap.put("message", fail);
            }
            status = HttpStatus.OK;
        } catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @DeleteMapping("/honeyDeal/{idx}")
    public ResponseEntity<?> deleteDeal(@PathVariable Integer idx){
        resultMap = new HashMap<>();
        try {
            if(dealService.deleteDeal(idx)){
                resultMap.put("message", okay);
            } else{
                resultMap.put("message", fail);
            }
            status = HttpStatus.OK;
        } catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @PostMapping("/honeyDeal/comment")
    public ResponseEntity<?> registDealComment(@RequestBody DealCommentDto dealCommentDto, HttpServletRequest request){
        resultMap = new HashMap<>();
        String decodeId = checkToken(request);
        if(decodeId != null){
            try {
                dealCommentDto.setUserId(decodeId);
                DealCommentDto data = dealService.registDealComment(dealCommentDto);
                if(data != null){
                    resultMap.put("data", data);
                    resultMap.put("message", okay);
                } else{
                    resultMap.put("message", fail);
                }
                status = HttpStatus.OK;
            } catch (Exception e){
                resultMap.put("message", fail);
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("/honeyDeal/comment/{idx}")
    public ResponseEntity<?> updateDealComment(@PathVariable Integer idx, @RequestBody DealCommentDto dealCommentDto){
        resultMap = new HashMap<>();
        try {
            DealCommentDto data = dealService.updateDealComment(idx, dealCommentDto);
            if(data != null){
                resultMap.put("data", data);
                resultMap.put("message", okay);
            } else{
                resultMap.put("message", fail);
            }
            status = HttpStatus.OK;
        } catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }
    @DeleteMapping("/honeyDeal/comment/{idx}")
    public ResponseEntity<?> deleteDealComment(@PathVariable Integer idx){
        resultMap = new HashMap<>();
        try {
            if(dealService.deleteDealComment(idx)){
                resultMap.put("message", okay);
            } else{
                resultMap.put("message", fail);
            }
            status = HttpStatus.OK;
        } catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/honeyDeal/like/{idx}")
    public ResponseEntity<?> likeDeal(@PathVariable Integer idx, HttpServletRequest request){
        resultMap = new HashMap<>();
        String decodeId = checkToken(request);
        try {
            if(dealService.likeDeal(idx, decodeId)){
                resultMap.put("message", okay);
            } else{
                resultMap.put("message", fail);
            }
             status = HttpStatus.OK;
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
