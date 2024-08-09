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
        boxShadow: 'box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Block;
