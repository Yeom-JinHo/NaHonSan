// 1. 댓글 위 지도 누르면 컴포넌트가 모달로
// 2. 사용자와 사용자간의 중간 거리를 핀으로 표시. 중간핀자체는 동적으로 움직일 수 있게.
// 3. 카카오지도api를 사용해서 지도기능을 불러오기
import React, {useEffect, useRef} from "react";
import "./DealMap.scss";
// global kakao

function DealMap() {
  const { kakao } = window; //kakao 오류뜨는 이유 머냐고 ....
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), //위도 경도 백에서 받아오기
      level: 5, // 확대랑 축소정도
    };
    const map = new kakao.maps.Map(container, options);
  }, []);
  return (
    <div id="dealmap">
      <div className="mapsight" ref={mapRef}>map</div>
    </div>
  );
}

export default DealMap;
// 아이콘 찾기, 위치 api 물어보기