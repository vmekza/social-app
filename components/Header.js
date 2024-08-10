'use client';
import React from 'react';
import css from '/styles/header.module.css';
import Block from '@/components/Block/Block';
import Image from 'next/image';
import { Flex } from 'antd';
import ModeSwitch from '@/components/ModeSwitch';

const Header = () => {
  return (
    <div className={css.wrapper}>
      <Block
        style={{
          height: '100%',
          borderRadius: '8px',
        }}
      >
        <div className={css.header_container}>
          <Image
            className='css.logo'
            src={'/images/logo.png'}
            width={70}
            height={40}
            alt='logo'
          />
          <Flex gap={25} align='center'>
            <ModeSwitch></ModeSwitch>
          </Flex>
        </div>
      </Block>
    </div>
  );
};

export default Header;
