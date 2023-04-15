import { Fragment } from 'react';
import React from 'react';
import Link from 'next/link';
import styles from 'styles/header.module.scss';

import Header from '../components/common/Header';
import MapSection from '@components/home/MapSection';

import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';

export default function Home() {
  return (
    <Fragment>
      <Header
        rightElements={[
          <button
            onClick={() => {
              alert('복사');
            }}
            className={styles.box}
            key="button"
            style={{ marginRight: 8 }}
          >
            <AiOutlineShareAlt size={20} />
          </button>,
          <Link
            href="/feedback"
            className={styles.box}
            key="link"
            style={{ marginRight: 15 }}
          >
            <VscFeedback size={20} />
          </Link>,
        ]}
      />
      <main style={{ width: '100%', height: '100%' }}>
        <MapSection />
      </main>
    </Fragment>
  );
}
