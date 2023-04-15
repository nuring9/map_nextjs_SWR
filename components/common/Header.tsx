import React from 'react';
import Link from 'next/link';
import styles from 'styles/header.module.scss';

import Image from 'next/image';
interface Props {
  rightElements?: React.ReactElement[];
}

const HeaderComponent = ({ rightElements }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.flexItem}>
        <Link href="/" className={styles.box}>
          <Image
            src="/inflearn.png"
            alt="header_rogo"
            width={110}
            height={20}
          ></Image>
        </Link>
      </div>
      {rightElements && (
        <div className={styles.flexItem} /*style={{ marginRight: 10 }}*/>
          {rightElements}
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
