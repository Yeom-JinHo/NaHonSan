package com.gwangjubob.livealone.backend.service;

import com.gwangjubob.livealone.backend.domain.entity.TipCommentEntity;
import com.gwangjubob.livealone.backend.domain.entity.TipEntity;
import com.gwangjubob.livealone.backend.domain.entity.UserEntity;
import com.gwangjubob.livealone.backend.domain.repository.TipCommentRepository;
import com.gwangjubob.livealone.backend.domain.repository.TipRepository;
import com.gwangjubob.livealone.backend.domain.repository.UserRepository;
import com.gwangjubob.livealone.backend.dto.tip.TipCreateDto;
import com.gwangjubob.livealone.backend.dto.tip.TipDetailViewDto;
import com.gwangjubob.livealone.backend.dto.tip.TipUpdateDto;
import com.gwangjubob.livealone.backend.dto.tip.TipViewDto;
import com.gwangjubob.livealone.backend.dto.tipcomment.TipCommentCreateDto;
import com.gwangjubob.livealone.backend.dto.tipcomment.TipCommentUpdateDto;
import com.gwangjubob.livealone.backend.dto.tipcomment.TipCommentViewDto;
import com.gwangjubob.livealone.backend.dto.user.UserInfoDto;
import com.gwangjubob.livealone.backend.mapper.TipCreateMapper;
import com.gwangjubob.livealone.backend.mapper.TipDetailViewMapper;
import com.gwangjubob.livealone.backend.mapper.TipUpdateMapper;
import com.gwangjubob.livealone.backend.mapper.UserInfoMapper;
import org.apache.catalina.User;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ExtendWith(SpringExtension.class)
@SpringBootTest
//@Transactional
public class TipServiceTest {
    private TipRepository tipRepository;
    private TipService tipService;
    private TipCommentService tipCommentService;
    private UserRepository userRepository;
    private TipCommentRepository tipCommentRepository;
    private TipCreateMapper tipCreateMapper;
    private TipUpdateMapper tipUpdateMapper;
    private TipDetailViewMapper tipDetailViewMapper;

    @Autowired
    public TipServiceTest(TipCommentService tipCommentService, TipRepository tipRepository, TipService tipService,
                            UserRepository userRepository, TipCommentRepository tipCommentRepository, TipCreateMapper tipCreateMapper,
                          TipUpdateMapper tipUpdateMapper, TipDetailViewMapper tipDetailViewMapper){
        this.tipRepository = tipRepository;
        this.tipService = tipService;
        this.tipCommentService = tipCommentService;
        this.userRepository = userRepository;
        this.tipCommentRepository = tipCommentRepository;
        this.tipCreateMapper = tipCreateMapper;
        this.tipUpdateMapper = tipUpdateMapper;
        this.tipDetailViewMapper = tipDetailViewMapper;
    }

    @Test
    public void 게시글_등록_테스트() {
        // given
        String  testNickname = "비밀번호는 test 입니다.";

        Optional<UserEntity> optionalUser = userRepository.findByNickname(testNickname); // 사용자 정보

        String category = "tip";
        String title = "꿀팁 제목테스트";
        String content = "꿀팁 내용 테스트";
        byte[] bannerImg = null;

        // when
        if(optionalUser.isPresent()){ // 회원 정보가 있다면
            UserEntity user = optionalUser.get();
            TipCreateDto dto = TipCreateDto.builder()
                    .userNickname(testNickname)
                    .category(category)
                    .title(title)
                    .content(content)
                    .bannerImg(bannerImg)
                    .build();

            TipEntity tip = tipCreateMapper.toEntity(dto);
            tip.setUser(user);

            tipRepository.save(tip);

            TipCreateDto tipDto = tipCreateMapper.toDto(tip);
            tipDto.setUserNickname(tip.getUser().getNickname());

            System.out.println("게시글 등록 성공");
        }else{
            System.out.println("게시글 등록 실패 - 회원 정보 없음");
        }

        // then
        Optional<TipEntity> result = tipRepository.findByTitle(title);
        if(result.isPresent()) {
            TipEntity entity = result.get();
            System.out.println(entity.toString());
        }
    }

    @Test
    public void 카테고리별_리스트_조회_테스트(){
        // given
        String category = "recipe";

        // when
        List<TipViewDto> result = tipService.viewTip(category);
        // then

        for(TipViewDto dto : result){
            System.out.println(dto.toString());
        }
    }

    @Test
    public void 게시글_상세_조회_테스트() {
        // given
        Integer idx = 33;

        Optional<TipEntity> testTip = tipRepository.findByIdx(idx);

        if(testTip.isPresent()){
            // when
            TipEntity tipEntity = testTip.get();
            TipDetailViewDto tipDto = tipDetailViewMapper.toDto(tipEntity);
            tipDto.setUserNickname(tipEntity.getUser().getNickname());

            // then
            System.out.println(tipDto.toString());

            // 게시글 관련된 댓글 조회
            List<TipCommentEntity> tipCommentEntity = tipCommentRepository.findByTip(tipEntity);
            List<TipCommentViewDto> result = new ArrayList<>();

            for(TipCommentEntity t : tipCommentEntity){
                TipCommentViewDto dto = TipCommentViewDto.builder()
                        .idx(t.getIdx())
                        .userProfileImg(t.getUser().getProfileImg())
                        .userNickname(t.getUser().getNickname())
                        .content(t.getContent())
                        .bannerImg(t.getBannerImg())
                        .time(t.getTime())
                        .build();

                result.add(dto);
            }

            for(TipCommentViewDto t : result){
                System.out.println(t.toString());
            }
        }

    }

    @Test
    public void 게시글_수정_테스트() {
        // given
        String testNickname = "비밀번호는 test 입니다.";
        Integer testIdx = 23;

        // 수정할 수 있는데이터
        String category = "tip";
        String title = "꿀팁 게시글 수정";
        String content = "꿀팁 내용 테스트 수정22";
        byte[] bannerImg = null;

        Optional<TipEntity> testTip = tipRepository.findByIdx(testIdx);

        if(testTip.isPresent()){
            TipEntity tip = testTip.get(); // idx에 해당하는 게시글 가져오기
            UserEntity user = userRepository.findByNickname(testNickname).get();
            // when
            if(testNickname.equals(tip.getUser().getNickname())){
                // 로그인 한 닉네임과 글 작성자가 같으면 수정 가능
                TipUpdateDto updateDto = TipUpdateDto.builder()
                        .category(category)
                        .title(title)
                        .content(content)
                        .bannerImg(bannerImg)
                        .build();

                TipEntity updateEntity = tipUpdateMapper.toEntity(updateDto);

                updateEntity.setUser(user);
                updateEntity.setIdx(testIdx);
                updateEntity.setTime(tip.getTime());
                updateEntity.setUpdateTime(LocalDateTime.now());

                tipRepository.saveAndFlush(updateEntity);
            }
        }

        // then
        Optional<TipEntity> result = tipRepository.findByTitle(title);
        if(result.isPresent()) {
            TipEntity entity = result.get();
            System.out.println(entity.toString());
        }
    }

    @Test
    public void 게시글_삭제_테스트(){
        // given
        String testId = "test";
        Integer idx = 37;

        Optional<TipEntity> testTip = tipRepository.findByIdx(idx);

        if(testTip.isPresent()){
            TipEntity tip = testTip.get();
            // when
            if(testId.equals(tip.getUser().getId())){
                // 작성자와 로그인한 사용자의 아이디가 같다면 삭제
                // 삭제 시 댓/대댓글도 모두 삭제
                // cascade 걸려있으니 그냥 삭제?
                tipRepository.delete(tip);
            }
        }
    }

    @Test
    public void 댓글_등록_테스트(){
        // given
        String nickname = "비밀번호는 test 입니다.";
        UserEntity user = userRepository.findByNickname(nickname).get();

        String content = "댓글 테스트222";
        byte[] bannerImg = null;

        Integer postIdx = 33;
        Optional<TipEntity> optionalTipEntity = tipRepository.findByIdx(postIdx);

        if(optionalTipEntity.isPresent()){
            TipEntity tip = optionalTipEntity.get(); // 게시글

            TipCommentCreateDto dto = TipCommentCreateDto.builder()
                    .content(content)
                    .bannerImg(bannerImg)
                    .build();

            TipCommentEntity entity = TipCommentEntity.builder()
                    .user(user)
                    .tip(tip)
                    .content(dto.getContent())
                    .bannerImg(dto.getBannerImg())
                    .build();

            tipCommentRepository.save(entity);
        }
    }

    @Test
    public void 대댓글_등록_테스트(){
        // given
        int upIdx = 33;

        String testNickname = "비밀번호는 test 입니다.";
        UserEntity user = userRepository.findByNickname(testNickname).get();

        String content = "대댓글테스트3333";
        byte[] bannerImg = null;

        int postIdx = 41;
        Optional<TipEntity> optionalTipEntity = tipRepository.findByIdx(postIdx);

        if(optionalTipEntity.isPresent()){
            TipEntity tip = optionalTipEntity.get();

            TipCommentCreateDto dto = TipCommentCreateDto.builder()
                    .content(content)
                    .bannerImg(bannerImg)
                    .build();

            TipCommentEntity entity = TipCommentEntity.builder()
                    .user(user)
                    .upIdx(upIdx)
                    .tip(tip)
                    .content(dto.getContent())
                    .bannerImg(dto.getBannerImg())
                    .build();

            tipCommentRepository.save(entity);
        }
    }

    @Test
    public void 댓글_대댓글_수정_테스트(){
        // given
        String nickname = "비밀번호는 ssafy 입니다.";
        String content = "댓글 수정 테스트";
        byte[] bannerImg = null;
        Integer idx = 43;
        Integer postIdx = 38;
        Integer upIdx = 0; // 댓글수정이면 0, 대댓글수정이면 댓글 글번호

        UserEntity user = userRepository.findByNickname(nickname).get();
        TipEntity tip = tipRepository.findByIdx(postIdx).get();
        Optional<TipCommentEntity> optionalTipComment = tipCommentRepository.findByIdx(idx);

        if(optionalTipComment.isPresent()){ // 댓글이 있다면 수정
            TipCommentEntity testTipComment = optionalTipComment.get();

            TipCommentEntity tipComment = TipCommentEntity.builder()
                    .idx(idx)
                    .user(user)
                    .tip(tip)
                    .upIdx(upIdx)
                    .content(content)
                    .time(testTipComment.getTime())
                    .updateTime(LocalDateTime.now())
                    .bannerImg(bannerImg)
                    .build();

            tipCommentRepository.saveAndFlush(tipComment);
        }

        // then
        Optional<TipCommentEntity> result = tipCommentRepository.findByIdx(idx);
        if(result.isPresent()){
            System.out.println(result.get().toString());
        }

    }

    @Test
    public void 댓글_대댓글_삭제_테스트() {
        // given
        Integer idx = 22; // 댓글 번호
        String testNickname = "비밀번호는 test 입니다.";
        Optional<TipCommentEntity> optionalTipComment = tipCommentRepository.findByIdx(idx);

        if(optionalTipComment.isPresent()){
            TipCommentEntity tipComment = optionalTipComment.get();
            // when
            if(testNickname.equals(tipComment.getUser().getNickname())){ // 아이디랑 댓글작성자 아이디가 같으면 삭제 가능
                if(tipComment.getUpIdx() != 0){ // 0이 아니면 대댓글이므로 그냥 삭제 가능
                    tipCommentRepository.delete(tipComment);
                }else{ // 댓글이랑 엮인 대댓글"들"까지 삭제해야함
                    List<TipCommentEntity> replyCommentList = tipCommentRepository.findByUpIdx(idx); // 대댓글 리스트 조회

                    if(!replyCommentList.isEmpty()){
                        tipCommentRepository.deleteAllInBatch(replyCommentList);
                    }
                    tipCommentRepository.delete(tipComment); // 댓글 삭제

                }
            }
        }

        // then
    }
}