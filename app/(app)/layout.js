'use client';
import React from 'react';
import { SettingContextProvider } from '@/context/settings/setting-provider';
import ThemeProvider from '@/lib/ThemeProvider';
import Block from '@/components/Block/Block';
import css from '@/styles/homeLayout.module.css';
import Header from '@/components/Header';

const HomeLayout = ({ children }) => {
  return (
    <SettingContextProvider>
      <ThemeProvider>
        <Block
          type='mainBgColor'
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div className={css.container}>
            {/** Header */}
            <Header />
          </div>
        </Block>
      </ThemeProvider>
    </SettingContextProvider>
  );
};

export default HomeLayout;
