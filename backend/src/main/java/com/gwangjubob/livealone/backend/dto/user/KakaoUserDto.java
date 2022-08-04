package com.gwangjubob.livealone.backend.dto.user;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KakaoUserDto {
    private Long id;
    private Boolean has_signed_up;
    private Date connected_at;
    private Date synched_at;
}
