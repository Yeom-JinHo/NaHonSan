import { getDummy } from "@apis/dummy";
import { getTipList } from "@apis/tip";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import Card, { CardProps } from "./Card";
import "./CardList.scss";
import CardSkeleton from "./CardSkeleton";

export type conditionType = {
  sort: string;
  searchType: "deal" | "tip";
  keyword: string | null;
  category: string;
  page: number;
};

type CardListProps = conditionType & {
  handleSpinner: () => void;
  handleIsEnd: () => void;
};

function CardList({
  searchType,
  sort,
  keyword,
  category,
  page,
  handleSpinner,
  handleIsEnd
}: CardListProps) {
  const [cards, setCards] = useState<Array<CardProps>>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      if (searchType === "tip") {
        const res = await getTipList(category, keyword, sort, page);
        if (res.isEnd) handleIsEnd();
        setCards(res.data);
        setIsLoading(true);
        handleSpinner();
      }
    })();
  }, []);
  return (
    <div id="card-list" className="flex justify-center">
      {isLoading
        ? cards.map(
            ({
              type,
              idx,
              userNickname,
              userProfileImg,
              title,
              bannerImg,
              like,
              comment,
              view
            }) => (
              <Card
                type={type}
                idx={idx}
                userNickname={userNickname}
                userProfileImg={userProfileImg}
                title={title}
                bannerImg={bannerImg}
                like={like}
                comment={comment}
                view={view}
                key={v4()}
              />
            )
          )
        : [0, 1, 2, 3, 4, 5].map(() => <CardSkeleton key={v4()} />)}
    </div>
  );
}

export default React.memo(CardList);
