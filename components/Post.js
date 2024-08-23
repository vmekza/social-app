import React from 'react';
import css from '@/styles/post.module.css';
import { Avatar, Flex, Typography, Image } from 'antd';
import Block from './Block/Block';
import dayjs from 'dayjs';
import { getFileType } from '@/utils';

const Post = ({ data }) => {
  return (
    <div className={css.wrapper}>
      <Block>
        <div className={css.post_container}>
          <Flex align='center' justify='space-between'>
            <Flex gap={'0.5rem'} align='center'>
              <Avatar size={40} src={data?.author?.image_url} />
              <Flex vertical>
                <Typography className='subtitle2'>
                  {data?.author?.first_name} {''}
                  {data?.author?.last_name}
                </Typography>
                <Typography.Text className='dateType' type='secondary' strong>
                  {dayjs(data?.created_at).format('DD MMM YYYY')}
                </Typography.Text>
              </Flex>
            </Flex>
          </Flex>
          <Typography.Text>
            <div
              dangerouslySetInnerHTML={{
                __html: data?.postText?.replace(/\n/g, '<br/>'),
              }}
            />
          </Typography.Text>
          {getFileType(data?.media) === 'image' && (
            <div className={css.post_media}>
              <Image
                className={css.post_image}
                src={data?.media}
                alt='post media'
                style={{ objectFit: 'cover', borderRadius: '0.3rem' }}
              />
            </div>
          )}
        </div>
      </Block>
    </div>
  );
};

export default Post;
