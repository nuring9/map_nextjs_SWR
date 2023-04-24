import { Fragment, useEffect } from 'react';

import { NextPage } from 'next';

import MapSection from '@components/home/MapSection';
import Header from '@components/home/Header';
import useStores from '@hooks/useStores';

import { Store } from 'types/store';
import DetailSection from '@components/home/DetailSection';

interface Props {
  stores: Store[];
}

const Home: NextPage<Props> = ({ stores }) => {
  const { initializeStores } = useStores(); // 훅으로 선언한 함수를 가져옴.

  useEffect(() => {
    initializeStores(stores); // 새로운 매장 데이터가 들어왔을 때, stores로 인자를 주었으니 hooks로 넘어가 STORE_KEY에 전역상태로 관리?
  }, [initializeStores, stores]);

  return (
    <Fragment>
      <Header />
      <main style={{ position: 'relative', width: '100%', height: '100%' }}>
        <MapSection />
        <DetailSection />
      </main>
    </Fragment>
  );
};

export default Home;

export async function getStaticProps() {
  /** TODO: next api routes로 불러오기. 아래와 같이 데이터를 로컬파일로 불러올 일은 없기때문. */
  const stores = (await import('../public/stores.json')).default;

  return {
    props: { stores }, // await import한 데이터를 prop으로 넘겨줌. Home의 prop으로 받아진다.
    revalidate: 60 * 60, // 매장 데이터는 빠르게 바뀌는 값이 아니기 때문에 시간을 길게줌. 한시간
  };
}
