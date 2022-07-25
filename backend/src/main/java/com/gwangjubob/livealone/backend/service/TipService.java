package com.gwangjubob.livealone.backend.service;

import com.gwangjubob.livealone.backend.dto.tip.TipCreateDto;

public interface TipService {
    void createTip(String decodeId, TipCreateDto tipCreateDto);
}
