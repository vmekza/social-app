'use client';
import { useState } from 'react';
import { SettingContext } from './setting-context';

export const SettingContextProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    theme: 'light',
    isNavigationShow: false,
  });

  return (
    <SettingContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingContext.Provider>
  );
};
