import React from 'react';
import { SettingContext } from '@/context/settings/setting-context';
import { Avatar, Flex } from 'antd';
import Block from './Block/Block';

const Comment = ({ data }) => {
  const {
    settings: { theme },
  } = useContext(SettingContext);

  return (
    <Block>
      <Avatar
        src={data?.author?.image_url}
        size={30}
        style={{ boxShadow: 'var(--shadow)' }}
      />
      <Flex vertical flex={1} gap={'0.5rem'}></Flex>
    </Block>
  );
};

export default Comment;
