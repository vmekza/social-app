'use client';
import { ConfigProvider, theme } from 'antd';
import { useSettingContext } from '@/context/settings/setting-context';
import { useCallback } from 'react';

const ThemeProvider = ({ children }) => {
  const {
    settings: { theme: globalTheme },
  } = useSettingContext();

  const blockBg = useCallback(() => {
    return globalTheme === 'light' ? '#F5F5F5' : '#444444';
  }, [globalTheme]);

  const mainBgColor = useCallback(() => {
    return globalTheme === 'light' ? 'white' : '#111111';
  }, [globalTheme]);
  return (
    <ConfigProvider
      theme={{
        algorithm:
          globalTheme === 'light'
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,

        token: {
          fontFamily: 'inherit',
          colorPrimary: '#F9AA11',
          blockBg: blockBg(),
          mainBgColor: mainBgColor(),
        },
        components: {
          Typography: {
            lineHeight: 'none',
            fontSize: 'none',
            fontWeightStrong: 'none',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
