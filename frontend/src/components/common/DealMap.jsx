import React, { useEffect, useRef } from "react";
import "./DealMap.scss";

function DealMap() {
  const { kakao } = window;
  const mapRef = useRef(null);
  useEffect(() => {
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    // const points = [
    //   new kakao.maps.LatLng(33.450701, 126.570667),
    //   new kakao.maps.LatLng(33.450901, 126.574667),
    //   new kakao.maps.LatLng(33.450801, 126.572667)
    // ];
    const map = new kakao.maps.Map(container, options);
    const markerPosition1 = new kakao.maps.LatLng(33.450701, 126.570667);
    const markerPosition2 = new kakao.maps.LatLng(33.450901, 126.574667);
    const mdMarkerPosition = new kakao.maps.LatLng(33.450801, 126.572667);
    const marker1 = new kakao.maps.Marker({
      position: markerPosition1
    });
    const marker2 = new kakao.maps.Marker({
      position: markerPosition2
    });
    const mdMarker = new kakao.maps.Marker({
      position: mdMarkerPosition
    });
    marker1.setMap(map);
    marker2.setMap(map);
    mdMarker.setMap(map);
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(markerPosition1);
    bounds.extend(markerPosition2);
    bounds.extend(mdMarkerPosition);
    map.setBounds(bounds);
  }, []);
  return (
    <div id="dealmap">
      <div className="mapsight" ref={mapRef}>
        kakao
      </div>
    </div>
  );
}

export default DealMap;
