import React from 'react';
import { Button } from 'antd';
import { useSettingContext } from '@/context/settings/setting-context';
import { Icon } from '@iconify/react';

const ModeSwitch = () => {
  const { setSettings } = useSettingContext();
  return (
    <div>
      <Button
        style={{ padding: '0px', border: 'none', background: 'transparent' }}
        onClick={() => {
          setSettings((prev) => ({
            ...prev,
            theme: prev.theme === 'dark' ? 'light' : 'dark',
          }));
        }}
        icon={<Icon icon='ic:baseline-dark-mode' width={'33px'} />}
      />
    </div>
  );
};

export default ModeSwitch;
