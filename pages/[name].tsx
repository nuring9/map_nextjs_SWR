import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import type { Store } from '../types/store';
import DetailHeader from '@components/home/DetailHeader';
import DetailContent from '@components/home/DetailContent';
import styles from 'styles/detail.module.scss';

interface Props {
  store: Store;
}

const StoreDetail: NextPage<Props> = ({ store }) => {
  const expanded = true;

  return (
    <div className={`${styles.detailSection} ${styles.expanded}`}>
      <DetailHeader
        currentStore={store}
        expanded={expanded}
        onClickArrow={() => null}
      />
      <DetailContent currentStore={store} expanded={expanded} />
    </div>
  );
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
