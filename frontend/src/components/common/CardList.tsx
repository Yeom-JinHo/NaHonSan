import { getDummy } from "@apis/dummy";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import Card from "./Card";
import "./CardList.scss";

type CardListProps = {
  type: "tip" | "deal";
};

function CardList({ type }: CardListProps) {
  // let dummy: Array<any> = [];
  const [dummy, setDummy] = useState<Array<any>>([]);
  useEffect(() => {
    (async () => {
      const res = await getDummy();
      setDummy(res);
    })();
  }, []);
  return (
    <div id="card-list" className="flex justify-center">
      {dummy &&
        dummy.map(value => <Card type={type} data={value} key={v4()} />)}
    </div>
  );
}

export default CardList;
