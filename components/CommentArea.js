import React, { useState } from 'react';
import { Flex, Button } from 'antd';
import { Icon } from '@iconify/react';
import css from '@/styles/commentArea.module.css';
import CommentInput from './CommentInput';
import Comment from './Comment';

const CommentArea = ({ comments, postId, queryId }) => {
  const [openComments, setOpenComments] = useState(false);
  return (
    <Flex vertical gap={'1rem'}>
      <>
        {comments?.length > 1 && (
          <Button type='text' onClick={() => setOpenComments((prev) => !prev)}>
            <Flex>
              <Icon
                icon='ooui:expand'
                style={{ marginRight: '0.8rem', marginTop: '0.2rem' }}
              />
              Show more comments
            </Flex>
          </Button>
        )}
        {comments?.length > 0 && (
          <Flex vertical gap={'0.5rem'} className={css.comment_area_container}>
            {!openComments ? (
              <Comment data={comments[comments.length - 1]} />
            ) : (
              comments.map((c, index) => <Comment key={index} data={c} />)
            )}
          </Flex>
        )}
      </>
      <CommentInput
        setOpenComments={setOpenComments}
        queryId={queryId}
        postId={postId}
      ></CommentInput>
    </Flex>
  );
};

export default CommentArea;
