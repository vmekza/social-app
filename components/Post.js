import React from 'react';
import css from '@/styles/post.module.css';
import { Avatar, Flex } from 'antd';
import Block from './Block/Block';

const Post = ({ data }) => {
  return (
    <div className={css.wrapper}>
      <Block>
        <div className={css.post_container}>
          <Flex align='center' justify='space-between'>
            <Flex gap={'0.5rem'} align='center'>
              <Avatar size={40} src={data?.author?.image_url} />
            </Flex>
          </Flex>
        </div>
      </Block>
    </div>
  );
};

export default Post;
