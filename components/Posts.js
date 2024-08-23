'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { getMyFeedPosts } from '@/actions/post';
import { Flex, Spin, Typography } from 'antd';
import { useInView } from 'react-intersection-observer';
import Post from './Post';

const Posts = () => {
  const { ref, inView } = useInView();
  const checkLastViewRef = (index, page) => {
    if (index === page?.data?.length - 1) {
      return true;
    } else return false;
  };
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: 'posts',
    queryFn: ({ pageParam = '' }) => getMyFeedPosts(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData?.lastCursor;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  if (isError) {
    return <Typography>Oh no, something went wrong...</Typography>;
  }
  if (isLoading) {
    return (
      <Flex vertical align='center' gap='large'>
        <Spin />
        <Typography>Wait a second... Loading...</Typography>
      </Flex>
    );
  }
  if (isSuccess) {
    return (
      <Flex vertical gap={'1rem'}>
        {data?.pages?.map((page) =>
          page?.data?.map((post, index) =>
            checkLastViewRef(index, page) ? (
              <div
                key={post?.id}
                style={{
                  width: '100%',
                  background: 'blue',
                  height: '30rem',
                }}
                ref={ref}
              >
                <Post data={post} />
              </div>
            ) : (
              <div
                key={post?.id}
                style={{
                  width: '100%',
                  background: 'blue',
                  height: '30rem',
                  borderRadius: '0.5rem',
                }}
              >
                <Post data={post} />
              </div>
            )
          )
        )}
        {(isLoading || isFetchingNextPage || isFetching) && (
          <Flex vertical align='center' gap='large'>
            <Spin />
            <Typography>Wait a second... Loading...</Typography>
          </Flex>
        )}
      </Flex>
    );
  }
};
export default Posts;
