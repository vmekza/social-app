import React from 'react';
import css from '@/styles/post.module.css';
import { Avatar, Flex, Typography, Image } from 'antd';
import Block from './Block/Block';
import dayjs from 'dayjs';
import { getFileType } from '@/utils';
import LikeButton from './LikeButton';
import Comment from './Comment';
import CommentArea from './CommentArea';

const Post = ({ data, queryId }) => {
  return (
    <div className={css.wrapper}>
      <Block>
        <div className={css.post_container}>
          <Flex align='center' justify='space-between'>
            <Flex gap={'0.5rem'} align='center'>
              <Avatar
                style={{
                  width: '2.6rem',
                  height: '2.6rem',
                  boxShadow: 'var(--shadow)',
                  marginRight: '0.5rem',
                }}
                src={data?.author?.image_url}
              />
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
                src={data?.media}
                alt='post media'
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          {getFileType(data?.media) === 'video' && (
            <div className={css.post_media}>
              <video
                src={data?.media}
                controls
                alt='post media'
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '0.5rem',
                }}
              />
            </div>
          )}
          <Flex>
            <LikeButton
              postId={data?.id}
              likes={data?.likes}
              queryId={queryId}
            />
            <Comment comments={data?.comments?.length} />
          </Flex>
          <CommentArea
            comments={data?.comments}
            postId={data?.id}
            queryId={queryId}
          />
        </div>
      </Block>
    </div>
  );
};

export default Post;
