import { Flex, Avatar, Input, Button } from 'antd';
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Icon } from '@iconify/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '@/actions/post';
import toast from 'react-hot-toast';

const CommentInput = ({ postId, setOpenComments, queryId }) => {
  const { user } = useUser();
  const [value, setValue] = useState('');
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (postId) => addComment(postId, value),

    onMutate: async () => {
      setOpenComments(true);

      await queryClient.cancelQueries(['posts', queryId]);
      const previousPosts = queryClient.getQueryData(['posts', queryId]);

      queryClient.setQueryData(['posts', queryId], (old) => {
        return {
          ...old,
          pages: old.pages.map((page) => {
            return {
              ...page,
              data: page.data.map((post) => {
                if (post.id === postId) {
                  return {
                    ...post,
                    comments: [
                      ...post.comments,
                      {
                        comment: value,
                        authorId: user?.id,
                        author: {
                          first_name: user?.firstName,
                          last_name: user?.lastName,
                          image_url: user?.imageUrl,
                        },
                      },
                    ],
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
    onError: (error, variables, context) => {
      toast.error('Error adding comment');
      queryClient.setQueryData(['posts'], context.previousPosts);
    },

    onSettled: () => {
      queryClient.invalidateQueries(['posts']);
      setValue('');
    },
  });
  return (
    <Flex gap={'1rem'} align='center'>
      <Avatar
        src={user?.imageUrl}
        size={40}
        style={{ minWidth: '40px', boxShadow: 'var(--shadow)' }}
      />
      <Input.TextArea
        placeholder='Spot a comment...'
        style={{ resize: 'none' }}
        autoSize={{ minRows: 1, maxRows: 5 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        type='primary'
        onClick={() => mutate(postId)}
        disabled={isPending || !value || value === ''}
        style={{
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          marginLeft: '-0.7rem',
        }}
      >
        <Icon
          icon={'mdi:send'}
          width={'1.6rem'}
          color={'var(--color-btn)'}
        ></Icon>
      </Button>
    </Flex>
  );
};

export default CommentInput;
