import { Flex } from 'antd';
import React from 'react';

const CommentInput = ({ postId, setOpenComments, queryId }) => {
  return (
    <Flex gap={'1rem'} align='center'>
      <Avatar src={user?.imageUrl} size={40} style={{ minWidth: '40px' }} />
    </Flex>
  );
};

export default CommentInput;
