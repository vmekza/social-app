import { Flex, Avatar, Input, Button } from 'antd';
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Icon } from '@iconify/react';

const CommentInput = ({ postId, setOpenComments, queryId }) => {
  const { user } = useUser();
  const [value, setValue] = useState('');
  return (
    <Flex gap={'1rem'} align='center'>
      <Avatar src={user?.imageUrl} size={40} style={{ minWidth: '40px' }} />
      <Input.TextArea
        placeholder='Spot a comment...'
        style={{ resize: 'none' }}
        autoSize={{ minRows: 1, maxRows: 5 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type='primary'>
        <Icon icon={'mdi:send'} width={'1.2rem'}></Icon>
      </Button>
    </Flex>
  );
};

export default CommentInput;
