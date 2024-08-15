'use client';

import React, { useState } from 'react';
import css from '@/styles/postForm.module.css';
import Block from '@/components/Block/Block';
import { Avatar, Flex, Input } from 'antd';
import { useUser } from '@clerk/nextjs';

const PostForm = () => {
  const { user } = useUser();
  const [post, setPost] = useState('');
  return (
    <div className={css.wrapper}>
      <Block className={css.postForm_container}>
        <Flex style={{ width: '100%' }} gap={'1rem'}>
          <Avatar
            src={user?.imageUrl}
            style={{
              width: '2.6rem',
              height: '2.6rem',
              boxShadow: 'var(--shadow)',
            }}
          />
          <Input.TextArea
            placeholder='Share your progress, your thoughts, or your next challenge...'
            style={{ height: 80, resize: 'none', flex: 1 }}
            value={post}
            onChange={(e) => setPost(e.target.value)}
          ></Input.TextArea>
        </Flex>
      </Block>
    </div>
  );
};

export default PostForm;
