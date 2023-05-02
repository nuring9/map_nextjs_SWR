import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import type { Store } from '../types/store';

interface Props {
  store: Store;
}

const StoreDetail: NextPage<Props> = ({ store }) => {
  return <div>name: {store.name}</div>;
};
export default StoreDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const stores = (await import('../public/stores.json')).default;
  const paths = stores.map((store) => ({ params: { name: store.name } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stores = (await import('../public/stores.json')).default;
  const store = stores.find((store) => store.name === params?.name);

  return { props: { store } };
};
