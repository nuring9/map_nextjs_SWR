import React from 'react';
import Map from './Map';
import Markers from './Markers';
import { NaverMap } from 'types/map';
import useMap from '@hooks/useMap';
import useCurrentStore from '@hooks/useCurrentStore';

const MapSection = () => {
  const { initializeMap } = useMap(); // swr hook
  const { clearCurrentStore } = useCurrentStore(); // hook

  const onLoadMap = (map: NaverMap) => {
    initializeMap(map); // hook 사용
    naver.maps.Event.addListener(map, 'click', clearCurrentStore); // Click event를 추가하여 clearCurrentStore 함수 적용.
  };
  return (
    <>
      <Map onLoad={onLoadMap} />
      <Markers />
    </>
  );
};

export default MapSection;
