import React from 'react';
import useSWR from 'swr';

import { MAP_KEY } from '@hooks/useMap';
import { STORE_KEY } from '@hooks/useStores';

import Marker from './Marker';
import { ImageIcon, NaverMap } from 'types/map';
import { Store } from 'types/store';

const Markers = () => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY); // MAP_KEY 키를 사용하여 전역상태인 map(네이버map객체)을 가져온다.
  const { data: stores } = useSWR<Store[]>(STORE_KEY); // STORE_KEY 키를 사용하여 전역상태인 stores(json파일)를 가져온다.

  if (!map || !stores) return null;
  return (
    <>
      {stores.map((store) => {
        return (
          <Marker
            map={map}
            coordinates={store.coordinates}
            key={store.nid}
            icon={generateStoreMarkerIcon(store.season)} // generateStoreMarkerIcon 함수를 통해 적절한 아이콘을 얻는다.
          />
        );
      })}
    </>
  );
};

export default Markers;

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 13;
const SCALE = 2 / 3;

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export function generateStoreMarkerIcon(markerIndex: number): ImageIcon {
  return {
    url: 'images/markers.png', // 경로
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT), // 필요한 하나의 아이콘 사이즈
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0), // 스프라이트 이미지에서 몇번째 이미지를 사용할 것인지에 대한 옵션,좌표에 따라 잘라서 사용
    scaledSize: new naver.maps.Size( // 스프라이트 이미지의 전체크기를 원하는 사이즈로 리사이징 width, height
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALED_MARKER_HEIGHT
    ),
  };
}
