import React from 'react';
import useSWR from 'swr';

import { MAP_KEY } from '@hooks/useMap';
import { STORE_KEY } from '@hooks/useStores';

import Marker from './Marker';
import { NaverMap } from 'types/map';
import { Store } from 'types/store';

const Markers = () => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY); // MAP_KEY 키를 사용하여 전역상태인 map(네이버map객체)을 가져온다.
  const { data: stores } = useSWR<Store[]>(STORE_KEY); // STORE_KEY 키를 사용하여 전역상태인 stores(json파일)를 가져온다.

  if (!map || !stores) return null;
  return (
    <>
      {stores.map((store) => {
        return (
          <Marker map={map} coordinates={store.coordinates} key={store.nid} />
        );
      })}
    </>
  );
};

export default Markers;
