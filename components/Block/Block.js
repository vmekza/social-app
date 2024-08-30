'use client';
import React from 'react';
import { theme } from 'antd';
const { useToken } = theme;

const Block = ({ children, type = 'blockBg', style, ...other }) => {
  const { token } = useToken();
  return (
    <div
      {...other}
      style={{
        backgroundColor: token[type],
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Block;
