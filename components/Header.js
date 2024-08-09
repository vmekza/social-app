import React from 'react';
import css from '/styles/header.module.css';
import Block from '@/components/Block/Block';

const Header = () => {
  return (
    <div className={css.container}>
      <Block style={{ height: '100%' }}>
        <div className={css.header}>header</div>
      </Block>
    </div>
  );
};

export default Header;
