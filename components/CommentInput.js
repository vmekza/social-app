import { Flex, Avatar, Input } from 'antd';
import React from 'react';
import { useUser } from '@clerk/nextjs';

const CommentInput = ({ postId, setOpenComments, queryId }) => {
  const { user } = useUser();
  return (
    <Flex gap={'1rem'} align='center'>
      <Avatar src={user?.imageUrl} size={40} style={{ minWidth: '40px' }} />
      <Input.TextArea placeholder='Spot a comment' style={{ resize: 'none' }} />
    </Flex>
  );
};

export default CommentInput;
