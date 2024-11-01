import React from 'react';
import Home from '@/sections/Home';

export const metadata = () => {
  return {
    title: 'Brag Zone',
    description: 'Own your glory',
  };
};

const MainPage = async () => {
  return <Home />;
};

export default MainPage;
