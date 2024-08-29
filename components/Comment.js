import React from 'react';
// import { SettingContext } from '@/context/settings/setting-context';
import { Avatar, Flex, Typography } from 'antd';
import Block from './Block/Block';
import dayjs from 'dayjs';
import css from '@/styles/post.module.css';

const Comment = ({ data }) => {
  return (
    <Block>
      <Flex gap={'0.5rem'}>
        <Avatar
          src={data?.author?.image_url}
          size={30}
          style={{ boxShadow: 'var(--shadow)' }}
        />
        <Flex className={css.comment_person} vertical flex={1} gap={'0.2rem'}>
          <Flex align='center' justify='space-between'>
            <Typography.Text strong>
              {data?.author?.first_name} {data?.author?.last_name}
            </Typography.Text>
            <Typography.Text type='secondary' className='dateType' strong>
              {dayjs(data?.created_at).format('DD MMM YYYY')}
            </Typography.Text>
          </Flex>
          <Typography.Text className='fontType1'>
            {data?.comment}
          </Typography.Text>
        </Flex>
      </Flex>
    </Block>
  );
};

export default Comment;
