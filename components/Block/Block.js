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
        // boxShadow: 'box-shadow: 0px 4px 10px 1px red',
        // boxSizing: 'box-sizing: border-box',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Block;
