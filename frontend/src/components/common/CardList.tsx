import {
  DealCondition,
  TipCondition
} from "@store/ducks/infinity/infinity.type";
import { getTipList } from "@store/ducks/infinity/infinityThunk";
import { useAppDispatch } from "@store/hooks";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import Card, { CardProps } from "./Card";
import "./CardList.scss";
import CardSkeleton from "./CardSkeleton";

function CardList({
  searchType,
  condition
}: {
  searchType: "tip" | "deal";
  condition: TipCondition & DealCondition;
}) {
  const [cards, setCards] = useState<Array<CardProps>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      if (searchType === "tip") {
        const res = await dispatch(getTipList(condition));
        setCards(res.payload.data);
        setIsLoading(true);
      }
    })();
  }, []);
  return (
    <div id="card-list" className="flex">
      {isLoading
        ? cards.map(
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
        : [0, 1, 2, 3, 4, 5].map(() => <CardSkeleton key={v4()} />)}
    </div>
  );
}

export default React.memo(CardList);
