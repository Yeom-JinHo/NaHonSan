package com.gwangjubob.livealone.backend.service;


import com.gwangjubob.livealone.backend.dto.Deal.DealDto;

public interface DealService {
    DealDto registDeal(DealDto dealDto);
    DealDto viewDetailDeal(Integer idx);

    DealDto updateDeal(Integer idx, DealDto DealDto);

    boolean deleteDeal(Integer idx);
}
