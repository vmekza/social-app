'use client';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button, Flex, Typography } from 'antd';
import { Icon } from '@iconify/react';
import { HappyProvider } from '@ant-design/happy-work-theme';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updatePostLike } from '@/actions/post';
import { updateQueryCacheLikes } from '@/utils';

// Ensure this function is defined somewhere in your code

const LikeButton = ({ postId, likes, queryId }) => {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsLiked(likes?.some((like) => like?.authorId === user?.id));
  }, [user, likes]);

  const actionType = isLiked ? 'unlike' : 'like';

  const { mutate } = useMutation({
    mutationFn: (postId, actionType) => updatePostLike(postId, actionType),
    onMutate: async () => {
      await queryClient.cancelQueries(['posts', queryId]);
      const previousPosts = queryClient.getQueryData(['posts', queryId]);
      queryClient.setQueriesData(['posts', queryId], (old) => {
        return {
          ...old,
          pages: old.pages.map((page) => {
            return {
              ...page,
              data: page.data.map((post) => {
                if (post.id === postId) {
                  return {
                    ...post,
                    likes: updateQueryCacheLikes(
                      post.likes,
                      postId,
                      user.id,
                      actionType
                    ),
                  };
                } else {
                  return post;
                }
              }),
            };
          }),
        };
      });
      return { previousPosts };
    },
  });

  return (
    <HappyProvider>
      <Button
        size='small'
        style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
        onClick={() => mutate({ postId, actionType })}
      >
        <Flex gap={'0.5rem'} align='center'>
          <Icon
            icon='icon-park-outline:muscle'
            width={'22px'}
            style={{ color: isLiked ? 'red' : 'gray' }}
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
