import React, { useMemo } from 'react';
import Map from './Map';
import Markers from './Markers';
import { NaverMap } from 'types/map';
import useMap, { INITIAL_CENTER, INITIAL_ZOOM } from '@hooks/useMap';
import useCurrentStore from '@hooks/useCurrentStore';
import { useRouter } from 'next/router';
import type { Coordinates } from 'types/store';

const MapSection = () => {
  /** url query 로부터 initial zoom, center 값 설정 */
  const router = useRouter();
  /**
   * router.asPath === '/?zoom={}&lat={}&lng={}'
   * https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams
   */
  const query = useMemo(() => new URLSearchParams(router.asPath.slice(1)), []); // eslint-disable-line react-hooks/exhaustive-deps
  const initialZoom = useMemo(
    () => (query.get('zoom') ? Number(query.get('zoom')) : INITIAL_ZOOM),
    [query]
  );
  const initialCenter = useMemo<Coordinates>(
    () =>
      query.get('lat') && query.get('lng')
        ? [Number(query.get('lat')), Number(query.get('lng'))]
        : INITIAL_CENTER,
    [query]
  );

  /**  onLoadMap */
  const { initializeMap } = useMap(); // swr hook
  const { clearCurrentStore } = useCurrentStore(); // hook

  const onLoadMap = (map: NaverMap) => {
    initializeMap(map); // hook 사용
    naver.maps.Event.addListener(map, 'click', clearCurrentStore); // Click event를 추가하여 clearCurrentStore 함수 적용.
  };
  return (
    <>
      <Map
        onLoad={onLoadMap}
        initialCenter={initialCenter}
        initialZoom={initialZoom}
      />
      <Markers />
    </>
  );
};

export default MapSection;
