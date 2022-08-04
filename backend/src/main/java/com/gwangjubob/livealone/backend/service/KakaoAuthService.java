package com.gwangjubob.livealone.backend.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

@Service
@RequiredArgsConstructor
public class KakaoAuthService {

    @Transactional
    public String login(String authToken) {
        String reqURL = "https://kauth.kakao.com/oauth/token";

        String result = null;
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=80a775f65089dae0fef7fd767e30684e"); // TODO REST_API_KEY 입력
            sb.append("&redirect_uri=http://localhost:3000/oauth/kakao"); // TODO 인가코드 받은 redirect_uri 입력
            sb.append("&code=" + authToken);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);
            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);


            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return result;
    }
}
