import React, { useState, useEffect, useRef } from "react";
import "./DealMap.scss";
import mapMdMarker from "@images/mapmdmarker.gif";
import exit from "@images/X.svg";
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
      center: new kakao.maps.LatLng(35.18480088833835, 126.8533768895765),
      level: 2
    };

    const map = new kakao.maps.Map(container, options);
    const markerPosition1 = new kakao.maps.LatLng(
      35.1841322155411,
      126.877498406332
    );
    const markerPosition2 = new kakao.maps.LatLng(
      35.1854695611356,
      126.829255372821
    );

    const imgSrc = "https://i.ibb.co/dPJKs7h/mapmdmarker.gif";

    const imgSize = new kakao.maps.Size(64, 69);
    const imgOption = { offset: new kakao.maps.Point(27, 69) };
    const mdMarkerImg = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOption);
    const mdMarkerPosition = new kakao.maps.LatLng(
      35.18480088833835,
      126.8533768895765
    );

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

    const iwContent1 =
      '<div style="padding:5px;">login-user <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>';
    const iwPosition1 = new kakao.maps.LatLng(
      35.1841322155411,
      126.877498406332
    );

    const infowindow1 = new kakao.maps.InfoWindow({
      position: iwPosition1,
      content: iwContent1
    });
    infowindow1.open(map, marker1);

    const iwContent2 =
      '<div style="padding:5px;">target-user <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>';
    const iwPosition2 = new kakao.maps.LatLng(
      35.1854695611356,
      126.829255372821
    );

    const infowindow2 = new kakao.maps.InfoWindow({
      position: iwPosition2,
      content: iwContent2
    });
    infowindow1.open(map, marker1);
    infowindow2.open(map, marker2);

    const positions = [
      {
        title: "버정1",
        latlng: new kakao.maps.LatLng(35.18181088833835, 126.8503768895761)
      },
      {
        title: "버정2",
        latlng: new kakao.maps.LatLng(35.18282088833835, 126.8523768895762)
      },
      {
        title: "버정3",
        latlng: new kakao.maps.LatLng(35.18383088833835, 126.8513768895763)
      },
      {
        title: "버정4",
        latlng: new kakao.maps.LatLng(35.18684088833835, 126.8543768895764)
      },
      {
        title: "버정5",
        latlng: new kakao.maps.LatLng(35.18480088833835, 126.8533768895765)
      }
    ];

    const positions1 = positions.filter(function (position) {
      return (
        position.latlng.La !== 126.8533768895765 &&
        position.latlng.Ma !== 35.18480088833835
      );
    });
    console.log(positions1);
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    // "https://i.ibb.co/D8vPrJt/14553-marker-yellow-icon.png";
    const imageSize = new kakao.maps.Size(24, 35);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    const marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(35.18480088833835, 126.8533768895765),
      title: positions[4].title,
      image: markerImage
    });
    const iwContent = '<div style="padding:5px;">11분</div>';
    const iwRemoveable = true;

    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable
    });

    kakao.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
    console.log(marker);

    positions1.forEach(position1 => {
      console.log("hi");

      const imageSrcBus =
        // "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        "https://i.ibb.co/D8vPrJt/14553-marker-yellow-icon.png";
      const imageSizeBus = new kakao.maps.Size(24, 35);
      const markerImageBus = new kakao.maps.MarkerImage(
        imageSrcBus,
        imageSizeBus
      );
      const markerBus = new kakao.maps.Marker({
        map,
        position: position1.latlng,
        title: position1.title,
        image: markerImageBus
      });
      const iwContentBus = '<div style="padding:5px;">hi</div>';
      const iwRemoveableBus = true;

      const infowindowBus = new kakao.maps.InfoWindow({
        content: iwContentBus,
        removable: iwRemoveableBus
      });

      kakao.maps.event.addListener(markerBus, "click", function () {
        infowindowBus.open(map, markerBus);
      });
    });

    const circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(35.18480088833835, 126.8533768895765),
      radius: 1000, // 미터 단위의 원의 반지름입니다
      strokeWeight: 3, // 선의 두께입니다
      strokeColor: "#75B8FA", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "dashed", // 선의 스타일 입니다
      fillColor: "#CFE7FF", // 채우기 색깔입니다
      fillOpacity: 0.3 // 채우기 불투명도 입니다
    });

    circle.setMap(map);

    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(markerPosition1);
    bounds.extend(markerPosition2);
    bounds.extend(mdMarkerPosition);
    map.setBounds(bounds);
  }, []);

  return (
    <div id="dealmap">
      <div className="container" onClick={closeModal}>
        <div className="map">
          <div className="map-exit">
            <button type="button" onClick={closeModal}>
              <img src={exit} alt="exit" />
            </button>
          </div>
          <div
            role="section"
            className="map-sight flex"
            ref={mapRef}
            onClick={e => e.stopPropagation()}
          >
            <p>kakao</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealMap;
