'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { getMyFeedPosts } from '@/actions/post';
import { Flex, Spin, Typography } from 'antd';

const Posts = () => {
  const { data, isLoading, isError } = useInfiniteQuery({
    queryKey: 'posts',
    queryFn: ({ pageParam = '' }) => getMyFeedPosts(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData?.lastCursor;
    },
  });
  console.log(data);

  if (isError) {
    return <Typography>Oh no, something went wrong...</Typography>;
  }
  if (isLoading) {
    return (
      <Flex vertical align='center' gap='large'>
        <Spin />
        <Typography>Wait a second... It is loading...</Typography>
      </Flex>
    );
  }
};
export default Posts;
