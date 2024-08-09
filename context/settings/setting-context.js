'use client';
import { createContext, useContext } from 'react';

export const SettingContext = createContext({});

export const useSettingContext = () => {
  const context = useContext(SettingContext);

  if (!context) {
    throw new Error(
      'useSettingContext must be used within a SettingContextProvider'
    );
  }
  return context;
};
