import React, { useEffect, useRef } from 'react';
import Script from 'next/script';

import { Coordinates } from 'types/store';
import { NaverMap } from 'types/map';
import { INITIAL_CENTER, INITIAL_ZOOM } from '@hooks/useMap';
import styles from 'styles/map.module.scss';

type Props = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
};

const Map = ({
  mapId = 'map',
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: Props) => {
  const mapRef = useRef<NaverMap | null>(null);

  const initializeMap = () => {
    // 지도 초기화 함수 생성
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter), // 지도의 중심
      zoom: initialZoom, // 줌
      minZoom: 9,
      scaleControl: false, // 필요한 컨트롤 옵션 설정. (네이버 map api 사이트 참고) 아래와 동일
      mapDataControl: false,
      LogoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    /* https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html */
    const map = new window.naver.maps.Map(mapId, mapOptions); // 위에서 선언한 mapOptions 사용하여 새로운 네이버 map instance를 생성함.
    // 이 구문이 실행되면, mapId를 공유하는 아래의 div 태그에 네이버 지도 UI가 삽입된다.

    mapRef.current = map;

    if (onLoad) {
      // prop으로 onLoad 함수가 주어졌을 때,
      onLoad(map); // load가 완료 되었다고 부모 컴포넌트에 알리는 부분.
    }
  };

  useEffect(() => {
    // Map 컴포넌트가 unmount 됬을때, 해당 Map instance를 모두 파괴하도록 설정.
    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive" // afterInteractive(기본값) 페이지가 로드 되자마자 보여야 함.
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        onReady={initializeMap} // 소스가(src)가 온전히 잘 load 되면 onLoad(또는 onReady)함수가 실행된다.
        // onLoad 사용 시 뒤로가기 했을 때 화면에 나타나지 않은 버그가 발생해 onReady 사용.
      />
      <div id={mapId} className={styles.map} />
    </>
  );
};

export default Map;
