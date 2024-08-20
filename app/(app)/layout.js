'use client';
import React from 'react';
import { SettingContextProvider } from '@/context/settings/setting-provider';
import ThemeProvider from '@/lib/ThemeProvider';
import Block from '@/components/Block/Block';
import css from '@/styles/homeLayout.module.css';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { Toaster } from 'react-hot-toast';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const HomeLayout = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <SettingContextProvider>
      <ThemeProvider>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Block
            type='mainBgColor'
            style={{
              position: 'relative',
              width: '100vw',
              height: '100vh',
            }}
          >
            <div className={css.wrapper}>
              <Header />
              <div className={css.main_container}>
                <Navigation />

                <div className={css.page_content}>{children}</div>
              </div>
            </div>
          </Block>
        </HydrationBoundary>
        <Toaster />
      </ThemeProvider>
    </SettingContextProvider>
  );
};

export default HomeLayout;
