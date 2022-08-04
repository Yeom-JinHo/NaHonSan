/* eslint-disable no-nested-ternary */
import { reqDealList } from "@apis/deal";
import { reqTipList } from "@apis/tip";
import {
  DealCondition,
  TipCondition
} from "@store/ducks/infinity/infinity.type";
import { getDealList, getTipList } from "@store/ducks/infinity/infinityThunk";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import Card, { CardProps } from "./Card";
import "./CardList.scss";
import CardSkeleton from "./CardSkeleton";

function CardList({
  searchType,
  condition,
  pure
}: {
  searchType: "tip" | "deal";
  condition: TipCondition & DealCondition;
  pure: boolean;
}) {
  const [cards, setCards] = useState<Array<CardProps>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  // const infi = useAppSelector(state => state.infinity);
  useEffect(() => {
    // console.log("CARDlisT", pure, condition, infi);
    if (pure) {
      (async () => {
        let res;
        if (searchType === "tip") {
          res = await reqTipList(condition);
          setCards(res.data);
          setIsLoading(true);
        } else if (searchType === "deal") {
          res = await reqDealList(condition);
          setCards(res.data);
          setIsLoading(true);
        }
      })();
    } else {
      (async () => {
        let res;
        if (searchType === "tip") {
          res = await dispatch(getTipList(condition));
          setCards(res.payload.data);
          setIsLoading(true);
        } else if (searchType === "deal") {
          res = await dispatch(getDealList(condition));
          setCards(res.payload.data);
          setIsLoading(true);
        }
      })();
    }
  }, []);
  return (
    <div id="card-list" className="flex">
      {isLoading ? (
        cards.length === 0 ? (
          <div className="nocontent flex justify-center align-center notoReg fs-24">
            검색 결과가 없어요!
          </div>
        ) : (
          cards.map(
            ({
              idx,
              userNickname,
              userProfileImg,
              title,
              category,
              bannerImg,
              likes,
              comment,
              view
            }) => (
              <Card
                type={searchType}
                idx={idx}
                userNickname={userNickname}
                userProfileImg={userProfileImg}
                title={title}
                bannerImg={bannerImg}
                likes={likes}
                comment={comment}
                view={view}
                category={category}
                key={v4()}
              />
            )
          )
        )
      ) : (
        [0, 1, 2, 3, 4, 5].map(() => <CardSkeleton key={v4()} />)
      )}
    </div>
  );
}

export default React.memo(CardList);
