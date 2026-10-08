import React from 'react';
import type { LayoutProps } from './Layout.types';
import styles from './Layout.module.css';

const Layout: React.FC<LayoutProps> = ({ header, children, footer, modals }) => {
  return (
    <div className={styles.container}>
      {header}
      <div className={styles.contentArea}>
        <main className={styles.mainContent}>{children}</main>
        {footer}
      </div>
      {modals}
    </div>
  );
};

export default Layout;
