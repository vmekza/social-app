import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button, Flex, Typography } from 'antd';
import { Icon } from '@iconify/react';
import { HappyProvider } from '@ant-design/happy-work-theme';

const LikeButton = ({ post, likes, queryId }) => {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likes?.some((like) => like?.authorId == user?.id));
  }, [user, likes]);

  return (
    <HappyProvider>
      <Button
        size='small'
        style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
      >
        <Flex gap={'0.5rem'} align='center'>
          <Icon
            icon='icon-park-outline:muscle'
            width={'22px'}
            style={{ color: isLiked ? 'red' : 'grey' }}
          />
          <Typography.Text className='fontType1'>
            {likes?.length === 0 ? 'Like' : `${likes?.length} Likes`}
          </Typography.Text>
        </Flex>
      </Button>
    </HappyProvider>
  );
};

export default LikeButton;
