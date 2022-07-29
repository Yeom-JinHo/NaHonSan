import LoadingSpinner from "@images/LoadingSpinner.svg";
import { getAlarmList } from "@apis/alarm";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import Alarm, { AlarmProps } from "./Alarm";
import "./AlarmToolTip.scss";

type AlarmToolTipProps = {
  closeTooltip: () => void;
};

function AlarmToolTip({ closeTooltip }: AlarmToolTipProps) {
  const [alramList, setAlarmList] = useState([]);
  const [firstLoading, setFirstLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const res = await getAlarmList();
      if (res.message === "SUCCESS") {
        setFirstLoading(true);
        setAlarmList(res.data);
      }
    })();
  }, []);
  return (
    <div id="alarm-tool-tip">
      <ul className="alarm-list">
        {alramList.length === 0 ? (
          <p className="no-content flex align-center justify-center notoMid fs-16">
            {!firstLoading ? (
              <img
                src={LoadingSpinner}
                className="loading-spinner"
                alt="로딩스피너"
              />
            ) : (
              "확인 안한 알람이 없습니다."
            )}
          </p>
        ) : (
          alramList.map((alarm: AlarmProps) => (
            <Alarm
              idx={alarm.idx}
              noticeType={alarm.noticeType}
              postIdx={alarm.postIdx}
              fromUserNickname={alarm.fromUserNickname}
              postType={alarm.postType}
              read={alarm.read}
              time={alarm.time}
              closeTooltip={closeTooltip}
              key={v4()}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default AlarmToolTip;
