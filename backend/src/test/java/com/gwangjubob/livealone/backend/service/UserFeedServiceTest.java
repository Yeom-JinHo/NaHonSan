package com.gwangjubob.livealone.backend.service;

import com.gwangjubob.livealone.backend.domain.entity.*;
import com.gwangjubob.livealone.backend.domain.repository.*;
import com.gwangjubob.livealone.backend.dto.Deal.DealDto;
import com.gwangjubob.livealone.backend.dto.feed.PopularFollowDto;
import com.gwangjubob.livealone.backend.dto.user.UserInfoDto;
import com.gwangjubob.livealone.backend.mapper.DealMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
public class UserFeedServiceTest {
    private DMRepository dmRepository;
    private DMService dmService;
    private UserRepository userRepository;
    private UserCategoryRepository userCategoryRepository;
    private DealMapper dealMapper;
    private PasswordEncoder passwordEncoder;
    private JavaMailSender javaMailSender;
    private MailRepository mailRepository;
    private UserFeedRepository userFeedRepository;
    private UserService userService;
    private TipRepository tipRepository;
    private UserLikeRepository userLikeRepository;
    private DealRepository dealRepository;

    @Autowired
    UserFeedServiceTest(DMRepository dmRepository,UserLikeRepository userLikeRepository,UserCategoryRepository userCategoryRepository, DealMapper dealMapper,TipRepository tipRepository, DealRepository dealRepository,UserService userService, UserFeedRepository userFeedRepository, DMService dmService, JavaMailSender javaMailSender, MailRepository mailRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.dmRepository = dmRepository;
        this.dmService = dmService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.javaMailSender = javaMailSender;
        this.mailRepository = mailRepository;
        this.userFeedRepository = userFeedRepository;
        this.userService = userService;
        this.tipRepository = tipRepository;
        this.dealRepository = dealRepository;
        this.userCategoryRepository = userCategoryRepository;
        this.dealMapper = dealMapper;
        this.userLikeRepository = userLikeRepository;
    }

    @Test
    public void 팔로우_등록_테스트() {
        // given
        final UserFollowEntity userFollowEntity = UserFollowEntity.builder()
                .userId("test")
                .followId("ssafy")
                .build();

        // when
        final UserFollowEntity res = userFeedRepository.save(userFollowEntity);

        // then
        Assertions.assertThat(res.getIdx()).isNotNull();
        Assertions.assertThat(res.getUserId()).isEqualTo(userFollowEntity.getUserId());
        Assertions.assertThat(res.getFollowId()).isEqualTo(userFollowEntity.getFollowId());

    }
    @Test
    public void 팔로우_취소_테스트() {
        // given
        final String toId ="test";
        final String fromId = "ssafy";

        // when
        userFeedRepository.deleteByUserIdAndFollowId(toId,fromId);

        // then
        System.out.println("ok");

    }
    @Test
    public void 팔로우_리스트조회_테스트() {
        // given
        String id = "test";
        List<UserFollowEntity> res = new ArrayList<>();

        // when
        UserInfoDto userInfoDto = userService.infoUser(id); // 대상 id가 팔로우 설정이 되있다면?
        if(userInfoDto.getFollowOpen() == true){
            res = userFeedRepository.findByUserId(id);
        }

        // then
        for (UserFollowEntity r : res) {
            System.out.println(r.getIdx() + " : " + r.getFollowId());
        }

    }
    @Test
    public void 팔로워_리스트조회_테스트() {
        // given
        String id = "test";
        List<UserFollowEntity> res = new ArrayList<>();

        // when
        UserInfoDto userInfoDto = userService.infoUser(id); // 대상 id가 팔로워 설정이 되있다면?
        if(userInfoDto.getFollowerOpen() == true){
            res = userFeedRepository.findByFollowId(id);
        }

        // then
        for (UserFollowEntity r : res) {
            System.out.println(r.getIdx() + " : " + r.getUserId());
        }
    }
    @Test
    public void 팔로우_리스트검색_테스트() {
        // given
        String id = "test";
        String keyword = "비밀";

        // when
        List<UserFollowEntity> ress = userFeedRepository.findByUserIdAndFollowNicknameContaining(id,keyword).stream()
                .collect(Collectors.toList());

        // then
        for (UserFollowEntity r : ress) {
            System.out.println(r.getFollowNickname());
        }
    }
    @Test
    public void 팔로워_리스트검색_테스트() {
        // given
        String id = "ssafy";
        String keyword = "z";

        // when
        List<UserFollowEntity> ress = userFeedRepository.findByFollowIdAndUserNicknameContaining(id,keyword);

        // then
        for (UserFollowEntity r : ress) {
            System.out.println(r.getUserNickname());
        }
    }
    @Test
    public void 회원_피드_프로필_조회(){
        //given
        String id = "test"; //배경사진, 프로필사진, 닉네임, 상태메시지, 팔로우 팔로워 숫자 등을 보여줘야함.

        //when
        UserInfoDto userInfoDto = userService.infoUser(id);
        int followerCnt = userFeedRepository.countByFollowId(id);
        int followCnt = userFeedRepository.countByUserId(id);

        //then
        System.out.println(userInfoDto.toString());
        System.out.println("followCnt : "+ followCnt);
        System.out.println("followerCnt : "+ followerCnt);



    }
    @Test
    public void 회원_피드_게시글_조회() {
        //given
        String id = "test";
        int category = 1; //[0] = 꿀팁 [1] = 꿀딜
        Optional<UserEntity> userEntity = userRepository.findById(id);
        //when
        List<TipEntity> tipEntities = null;
        List<DealEntity> dealEntities = null;
        if (category == 0) { //사용자가 작성한 꿀팁 게시글 조회
            tipEntities = tipRepository.findByUser(userEntity.get());
        } else if (category == 1) {//사용자가 작성한 꿀팁 게시글 조회
            dealEntities = dealRepository.findByUser(userEntity.get());
        }

        //then
        if(category == 0){
            for (TipEntity tipEntity : tipEntities) {
                System.out.println(tipEntity.toString());
            }
        }else if(category == 1){
            for (DealEntity dealEntity : dealEntities){
                System.out.println(dealEntity.toString());
            }
        }
    }
    @Test
    public void 인기있는_팔로워_추천() {
        //given
        List<PopularFollowEntity> userFollowEntities = userFeedRepository.popularFollowerList();//조회
        List<PopularFollowDto> popularFollowDtoList = new ArrayList<>();
        //when
        for (PopularFollowEntity userFollowEntity : userFollowEntities){
            UserEntity userEntity = userRepository.findById(userFollowEntity.getFollowId()).get();
            PopularFollowDto popularFollowDto = new PopularFollowDto();
            popularFollowDto.setFollow_id(userEntity.getId());
            popularFollowDto.setFollow_nickname(userEntity.getNickname());
            popularFollowDto.setCnt(userFollowEntity.getCnt());
            popularFollowDto.setProfileImg(userEntity.getProfileImg());
            popularFollowDtoList.add(popularFollowDto);
        }
        //then
        for (PopularFollowDto popularFollowDto : popularFollowDtoList){
            System.out.println(popularFollowDto.toString());
        }
    }
    @Test
    @Transactional
    public void 카테고리기반_꿀딜_추천() {
        String category ="가전";
        String state = "test";

        //given
        UserEntity user = userRepository.findById("test").get();
        List<UserCategoryEntity> userCategoryEntityList = userCategoryRepository.findByUser(user);


        List<DealEntity> dealEntityList = new ArrayList<>();
        List<DealDto> result = new ArrayList<>();
        for(UserCategoryEntity userCategoryEntity : userCategoryEntityList){ // 사용자가 선택한 카테고리 목록
            List<DealEntity> findTop6 = dealRepository.findTop6ByCategoryAndStateAndAreaOrderByViewDesc(userCategoryEntity.getCategory(),"test",user.getArea());
            for(DealEntity dealEntity : findTop6){
                dealEntityList.add(dealEntity);
            }
        }
        HashMap<Integer,Boolean> map = new HashMap<>();//
        int cnt = 0;
        while(cnt < 6){
            int rand = (int)(Math.random() * dealEntityList.size());
            if(!map.containsKey(rand)){ // 뽑은 숫자가 아니라면 result에
                cnt++;
                map.put(rand,true);
                DealEntity dealEntity = dealEntityList.get(rand);
                DealDto dealDto = new DealDto();
                dealDto.setUserNickname(dealEntity.getUser().getNickname());
                dealDto.setTitle(dealEntity.getTitle());
                dealDto.setContent(dealEntity.getContent());
                dealDto.setCategory(dealEntity.getCategory());
                dealDto.setBannerImg(dealEntity.getBannerImg());
                dealDto.setView(dealEntity.getView());
                dealDto.setComment(dealEntity.getComment());
                dealDto.setLikes(dealEntity.getLikes());
                dealDto.setArea(dealEntity.getArea());
                dealDto.setState(dealEntity.getState());
                result.add(dealDto);
            }
        }
        for(DealDto dealDto : result){
            System.out.println(dealDto.toString());
        }
    }
    @Test
    public void 팔로우_한_꿀팁_게시글_조회_테스트(){
        Optional<UserEntity> user = userRepository.findById("test");

        //given
        List<UserLikeEntity> userLikeEntityList = userLikeRepository.findByUserId(user.get().getId());

        //then
        for(UserLikeEntity userLikeEntity : userLikeEntityList){
            System.out.println(userLikeEntity.toString());
        }
    }
}
