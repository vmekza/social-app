import React, { useState } from 'react';
import { Flex, Button } from 'antd';
import { Icon } from '@iconify/react';
import css from '@/styles/commentArea.module.css';

const CommentArea = ({ comments, postId, queryId }) => {
  const [openComments, setOpenComments] = useState(false);
  return (
    <Flex vertical gap={'1rem'}>
      <>
        {comments?.length > 1 && (
          <Button type='text' onClick={() => setOpenComments((prev) => !prev)}>
            <Flex>
              <Icon icon='ooui:expand' />
              Show more comments
            </Flex>
          </Button>
        )}
        {comments?.length > 0 && (
          <Flex vertical gap={'0.5rem'} className={css.comment_area_container}>
            {!openComments ? (
              <span>Not displayed</span>
            ) : (
              comments.map((c, index) => (
                <span key={index}>Dispalyed comments</span>
              ))
            )}
          </Flex>
        )}
      </>
      <CommentInput></CommentInput>
    </Flex>
  );
};

export default CommentArea;
