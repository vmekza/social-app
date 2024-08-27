import React from 'react';
import { Button, Flex, Typography } from 'antd';
import { Icon } from '@iconify/react';

const CommentBtn = ({ comments }) => {
  return (
    <Button type='text' size='small'>
      <Flex gap='0.5rem' align='center'>
        <Icon
          icon='material-symbols:comment-outline'
          width={'21px'}
          color='grey'
        />
        <Typography.Text>
          {comments > 0 ? `${comments} Comments` : 'Comment'}
        </Typography.Text>
      </Flex>
    </Button>
  );
};

export default CommentBtn;
