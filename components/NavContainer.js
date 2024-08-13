import React from 'react';

const NavContainer = ({
  isBurgerOpen,
  setIsBurgerOpen,
  children,
  ...other
}) => {
  return <div>{children}</div>;
};

export default NavContainer;
