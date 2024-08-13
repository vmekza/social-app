import React, { useState, useEffect } from 'react';
import windowSize from '@/hooks/windowSize';
import { Drawer } from 'antd';
import css from '@/styles/nav.module.css';

const NavContainer = ({
  isBurgerOpen,
  setIsBurgerOpen,
  children,
  ...other
}) => {
  const { width } = windowSize();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || width > 1268) {
    return children;
  }

  return (
    <Drawer
      className={css.burger_container}
      open={isBurgerOpen}
      placement='left'
      onClose={() => setIsBurgerOpen(false)}
      {...other}
      height={'100%'}
    >
      <div className={css.burger_container}>{children}</div>
    </Drawer>
  );
};

export default NavContainer;
