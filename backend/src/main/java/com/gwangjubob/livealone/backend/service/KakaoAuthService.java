package com.gwangjubob.livealone.backend.service;

import com.gwangjubob.livealone.backend.domain.entity.UserEntity;
import com.gwangjubob.livealone.backend.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class KakaoAuthService {
    private UserRepository userRepository;
    @Autowired
    KakaoAuthService(UserRepository userRepository ){
        this.userRepository = userRepository;
    }
//    public static JSONParser jsonParser;
    @Transactional
    public String login(String authToken) {
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        String jsonId;
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            //    요청에 필요한 Header에 포함될 내용
            conn.setRequestProperty("Authorization", "Bearer " + authToken);
            int responseCode = conn.getResponseCode();
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";
            while ((line = br.readLine()) != null) {
                result += line;
            }
            JSONParser parser = new JSONParser();
            JSONObject json = (JSONObject) parser.parse(result);
            JSONObject jsonObjectB = (JSONObject) json.get("properties");
            jsonId = json.get("id").toString();
            String jsonName = jsonObjectB.get("nickname").toString();
//            String IMAGE_URL = (String) jsonObjectB.get("thumbnail_image");
            String nameId = jsonName + jsonId.substring(0, 4);
            jsonId = "kakao" + jsonId;
            //DB에 회원인지 찾기
            Optional<UserEntity> user = userRepository.findByNickname(nameId);
            if (!user.isPresent()) { //존재하지 않는다면
                UserEntity userRegist = UserEntity.builder()
                        .id(jsonId)
                        .password("social")
                        .nickname(nameId)
                        .social("kakao")
                        .build();
                userRepository.save(userRegist);

            }


        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        return jsonId;
    }
}
