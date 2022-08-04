package com.gwangjubob.livealone.backend.service;

import com.google.gson.*;
import com.gwangjubob.livealone.backend.dto.user.KakaoUserDto;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.json.JSONParser;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;


@Service
@RequiredArgsConstructor
public class KakaoAuthService {
    @Transactional
    public HashMap<String, Object> login(String authToken) {
//        KakaoUserDto kakaoUserDto = webClient.get()
//                .uri("https://kapi.kakao.com/v2/user/me")
//                .headers(h -> h.setBearerAuth(authToken))
//                .retrieve()
////                .onStatus(HttpStatus::is4xxClientError, response -> Mono.error(new TokenValidFailedException("Social Access Token is unauthorized")))
////                .onStatus(HttpStatus::is5xxServerError, response -> Mono.error(new TokenValidFailedException("Internal Server Error")))
//                .bodyToMono(KakaoUserDto.class)
//                .block();
//
//
//        return kakaoUserDto.getHas_signed_up();

        //    요청하는 클라이언트마다 가진 정보가 다를 수 있기에 HashMap타입으로 선언
        HashMap<String, Object> userInfo = new HashMap<>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");

            //    요청에 필요한 Header에 포함될 내용
            conn.setRequestProperty("Authorization", "Bearer " + authToken);

            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            JSONParser jsonParser = null;
            JSONObject jsonObject = (JSONObject) jsonParser.parse(result);
//
//            JsonObject properties = array.getAsJsonObject().get("properties").getAsJsonObject();
//            JsonObject kakao_account = array.getAsJsonObject().get("kakao_account").getAsJsonObject();
//
//            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
//            String email = kakao_account.getAsJsonObject().get("email").getAsString();
//
//            userInfo.put("nickname", nickname);
//            userInfo.put("email", email);

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return userInfo;
    }
}
