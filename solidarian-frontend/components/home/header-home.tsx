'use client';

import { RootState } from '@/features/redux/store';
import { homeStyles } from '@/styles/app/home/page.styles';
import { useSelector } from 'react-redux';

export function HeaderHome() {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const styles = homeStyles;

  return (
    <header className={styles.header.wrapper}>
      <div className={styles.header.titleWrapper}>
        <h2 className={styles.header.title}>Hola, {currentUser?.fullName}</h2>
        <p className={styles.header.subtitle}>Explora comunidades y causas</p>
      </div>
    </header>
  );
}
