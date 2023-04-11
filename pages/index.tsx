import { Fragment } from 'react';
import Header from '../components/common/Header';
import React from 'react';
import Link from 'next/link';
import styles from 'styles/header.module.scss';

import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';

interface Props {
  rightElements?: React.ReactElement[];
}

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
          <Link href="/feedback" className={styles.box} key="link">
            <VscFeedback size={20} />
          </Link>,
        ]}
      />
      <main></main>
    </Fragment>
  );
}
