import React from 'react';
import Map from './Map';
import Markers from './Markers';
import { NaverMap } from 'types/map';
import useMap from '@hooks/useMap';

const MapSection = () => {
  const { initializeMap } = useMap(); // swr hook
  const onLoadMap = (map: NaverMap) => {
    initializeMap(map); // hook 사용
  };
  return (
    <>
      <Map onLoad={onLoadMap} /> 
      <Markers />
    </>
  );
};

export default MapSection;
