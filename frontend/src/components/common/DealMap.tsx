import React, { useEffect, useRef } from "react";
import "./DealMap.scss";
import mapMdMarker from "@images/mapmdmarker.gif";
import alarm from "@images/Alarm.svg";

interface DealMapProps {
  closeModal: () => void;
}

function DealMap({ closeModal }: DealMapProps) {
  const { kakao } = window as any;
  const mapRef = useRef(null);
  useEffect(() => {
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };

    const map = new kakao.maps.Map(container, options);
    const markerPosition1 = new kakao.maps.LatLng(33.450701, 126.570667);
    const markerPosition2 = new kakao.maps.LatLng(33.450901, 126.574667);

    const imgSrc = { mapMdMarker };
    const imgSize = new kakao.maps.Size(64, 69);
    const imgOption = { offset: new kakao.maps.Point(27, 69) };
    const mdMarkerImg = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOption);
    const mdMarkerPosition = new kakao.maps.LatLng(33.450801, 126.572667);
    
    const marker1 = new kakao.maps.Marker({
      position: markerPosition1
    });
    const marker2 = new kakao.maps.Marker({
      position: markerPosition2
    });
    const mdMarker = new kakao.maps.Marker({
      position: mdMarkerPosition,
      image: mdMarkerImg
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
      <div className="container flex" onClick={closeModal}>
        <div className="map-exit notoBold">
          <button type="button" onClick={closeModal}>
            닫기
          </button>
        </div>
        <div
          className="map-sight flex"
          ref={mapRef}
          onClick={e => e.stopPropagation()}
        >
          <p>kakao</p>
        </div>
      </div>
    </div>
  );
}

export default DealMap;
