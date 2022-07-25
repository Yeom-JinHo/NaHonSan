package com.gwangjubob.livealone.backend.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name="deal_comments")
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
public class DealCommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "post_idx")
    private DealEntity deal;

    LocalDateTime time;
    private String content;
    @Column(name = "banner_img")
    private String bannerImg;
    @Column(name = "up_idx")
    Integer upIdx;
    @Column(name = "position_x")
    Integer positionX;
    @Column(name = "position_y")
    Integer positionY;

}
