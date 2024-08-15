'use client';

import React, { useState } from 'react';
import css from '@/styles/postForm.module.css';
import Block from '@/components/Block/Block';
import { Avatar, Flex, Input, Button, Typography, Tooltip } from 'antd';
import { useUser } from '@clerk/nextjs';
import { Icon } from '@iconify/react';

const PostForm = () => {
  const { user } = useUser();
  const [post, setPost] = useState('');
  return (
    <div className={css.wrapper}>
      <Block className={css.post_form_container}>
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
        <Flex
          className={css.post_form_btn}
          align='center'
          justify='space-between'
        >
          {' '}
          <Button
            className={css.btn_image_video}
            type='text'
            // style={{ background: 'var(--primary)' }}
          >
            <Flex>
              <Tooltip title='Image'>
                <Icon
                  icon={'material-symbols:image-outline'}
                  width={'1.5rem'}
                  style={{ marginRight: '0.5rem' }}
                ></Icon>
              </Tooltip>
              <Tooltip title='Video'>
                <Icon icon={'mingcute:video-line'} width={'1.5rem'}></Icon>
              </Tooltip>
            </Flex>
          </Button>
          <Button
            type='primary'
            className={css.btn_share}
            style={{
              background: 'var(--color-btn)',
              color: 'black',
            }}
          >
            Share
          </Button>
        </Flex>
      </Block>
    </div>
  );
};

export default PostForm;
