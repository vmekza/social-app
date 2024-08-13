'use client';
import React from 'react';
import { Button, Typography } from 'antd';
import { Icon } from '@iconify/react';
import { useSettingContext } from '@/context/settings/setting-context';

const NavButton = () => {
  const { setSettings } = useSettingContext();
  return (
    <Button
      type='text'
      onClick={() =>
        setSettings((prev) => ({
          ...prev,
          isNavigationShow: !prev.isNavigationShow,
        }))
      }
    >
      <Typography>
        <Icon icon='iconamoon:menu-burger-horizontal' width='22px'></Icon>
      </Typography>
    </Button>
  );
};

export default NavButton;
