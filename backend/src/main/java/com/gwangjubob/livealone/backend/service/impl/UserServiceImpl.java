package com.gwangjubob.livealone.backend.service.impl;

import com.gwangjubob.livealone.backend.domain.entity.UserEntity;
import com.gwangjubob.livealone.backend.domain.repository.UserRepository;
import com.gwangjubob.livealone.backend.dto.user.UserLoginDto;
import com.gwangjubob.livealone.backend.dto.user.UserRegistDto;
import com.gwangjubob.livealone.backend.dto.user.UserUpdateDto;
import com.gwangjubob.livealone.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public boolean loginUser(UserLoginDto userLoginDto){
        Optional<UserEntity> user = userRepository.findByIdAndPassword(userLoginDto.getId(),userLoginDto.getPassword());
        Boolean passwordCheck = passwordEncoder.matches(userLoginDto.getPassword(),user.get().getPassword());
        if(passwordCheck == true){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public void userDelete(String id) {
        userRepository.deleteById(id);
    }

    
    public boolean registUser(UserRegistDto userRegistDto) {
        String password = passwordEncoder.encode(userRegistDto.getPassword());
        UserEntity user = UserEntity.builder()
                .id(userRegistDto.getId())
                .password(password)
                .nickname(userRegistDto.getNickname())
                .build();
        userRepository.save(user);
        System.out.println(userRepository.save(user));
        return true;
    }

    @Override
    public boolean checkNickName(String nickname) {
        return userRepository.findByNickname(nickname).isPresent();
    }

    @Override
    public UserUpdateDto updateUser(UserUpdateDto userUpdateDto) {
        Optional<UserEntity> user =  userRepository.findById(userUpdateDto.getId());
        if(user != null){
            user.get().setNickname(userUpdateDto.getNickname());
            user.get().setArea(userUpdateDto.getArea());
            user.get().setFollowOpen(userUpdateDto.getFollowOpen());
            user.get().setFollowerOpen(userUpdateDto.getFollowerOpen());
            user.get().setProfileImg(userUpdateDto.getProfileImg());
            user.get().setProfileMsg(userUpdateDto.getProfileMsg());
            user.get().setNotice(userUpdateDto.getNotice());
            user.get().setBackgroundImg(userUpdateDto.getBackgroundImg());
            userRepository.save(user.get());
            return userUpdateDto;
        }
        return null;
    }


}
