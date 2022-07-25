package com.gwangjubob.livealone.backend.service;

import com.gwangjubob.livealone.backend.domain.entity.DMEntity;
import com.gwangjubob.livealone.backend.domain.entity.MailEntity;
import com.gwangjubob.livealone.backend.domain.entity.NoticeEntity;
import com.gwangjubob.livealone.backend.domain.entity.UserEntity;
import com.gwangjubob.livealone.backend.domain.repository.DMRepository;
import com.gwangjubob.livealone.backend.domain.repository.MailRepository;
import com.gwangjubob.livealone.backend.domain.repository.NoticeRepository;
import com.gwangjubob.livealone.backend.domain.repository.UserRepository;
import com.gwangjubob.livealone.backend.dto.dm.DMSendDto;
import com.gwangjubob.livealone.backend.service.impl.DMServiceImpl;
import com.gwangjubob.livealone.backend.service.impl.MailService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
public class DMServiceTest {
    private DMRepository dmRepository;
    private DMService dmService;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JavaMailSender javaMailSender;
    private MailRepository mailRepository;

    @Autowired
    DMServiceTest(DMRepository dmRepository, DMService dmService,JavaMailSender javaMailSender,MailRepository mailRepository, UserRepository userRepository,PasswordEncoder passwordEncoder) {
        this.dmRepository = dmRepository;
        this.dmService = dmService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.javaMailSender = javaMailSender;
        this.mailRepository = mailRepository;
    }

    @Test
    public void 메시지_전송_성공_테스트() {
        // given
        final DMEntity dmEntity = DMEntity.builder()
                .fromUserId("test")
                .toUserId("ssafy")
                .content("test")
                .build();

        // when
        final DMEntity res = dmRepository.save(dmEntity);

        // then
        Assertions.assertThat(res.getIdx()).isNotNull();
        Assertions.assertThat(res.getFromUserId()).isEqualTo(dmEntity.getFromUserId());
        Assertions.assertThat(res.getToUserId()).isEqualTo(dmEntity.getToUserId());
        Assertions.assertThat(res.getContent()).isEqualTo(dmEntity.getContent());
    }
    @Test
    public void 메시지_리스트_조회_테스트(){
        // given
        final String id = "ssafy";


        // when
        List<DMEntity> dmEntityList = dmRepository.findListViews(id);

        // thens
        System.out.println("start");
        for (int i = 0; i < dmEntityList.size(); i++) {
            System.out.println(dmEntityList.get(i).toString());
        }
    }
    @Test
    public void 메시지_세부_조회_테스트(){
        // given
        final String toId = "ssafy";
        final String fromId = "test";


        // when
        List<DMEntity> dmEntityList = dmRepository.findByToUserIdAndFromUserId(toId, fromId);

        // thens
        for (int i = 0; i < dmEntityList.size(); i++) {
            System.out.println(dmEntityList.get(i).toString());
        }
    }
    @Test
    public void 비밀번호_인증_테스트(){
        //given
        final String id = "test";
        final String password = "test";

        //when
        Optional<UserEntity> user = userRepository.findById(id);
        boolean res = passwordEncoder.matches(password,user.get().getPassword());

        //thens
        if(res){
            System.out.println("OK");
        }else {
            System.out.println("FAIL");
        }
    }
    @Test
    public void 로그인_테스트(){
        //given
        final String id = "test";
        final String password = "test";

        //when
        Optional<UserEntity> user = userRepository.findById(id);
        boolean res = passwordEncoder.matches(password,user.get().getPassword());

        //thens
        if(res){
            System.out.println("OK");
        }else {
            System.out.println("FAIL");
        }
    }
    @Test
    public void 이메일_전송_테스트(){
        //given
        SimpleMailMessage message = new SimpleMailMessage();
        String authKey = "231456";
        String toId = "1552419@gmail.com";
        String fromId = "gwangjubob@gmail.com";
        String subject = ("[인증테스트] 나 혼자 잘 산다.");
        //when
        message.setTo(toId);
        message.setFrom(fromId);
        message.setSubject(subject);
        message.setText("인증번호 : "+ authKey);
        MailEntity dummyMail = MailEntity.builder()
                .id(toId)
                .type(fromId)
                .number(authKey)
                .build();
        mailRepository.saveAndFlush(dummyMail);
        javaMailSender.send(message); //메일 전송
        MailEntity mail = MailEntity.builder()
                .id(toId)
                .type("0")
                .number(authKey)
                .build();
        mailRepository.saveAndFlush(mail);
        //thens
        System.out.println("OK");
    }
    @Test
    @Disabled
    public void 메시지_전송_존재하지않는사용자_테스트() {
        // given
        DMSendDto dmSendDto = new DMSendDto();
        dmSendDto.setFromId("test123");
        dmSendDto.setToId("ssafy");
        dmSendDto.setContent("test");

        // when
        boolean res = dmService.sendDM(dmSendDto);


        // then
        System.out.println(res);
//        Assertions.assertThat(res.getIdx()).isNotNull();
//        Assertions.assertThat(res.getFromUserId()).isEqualTo(dmEntity.getFromUserId());
//        Assertions.assertThat(res.getToUserId()).isEqualTo(dmEntity.getToUserId());
//        Assertions.assertThat(res.getContent()).isEqualTo(dmEntity.getContent());
    }

}
