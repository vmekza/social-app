'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { getMyFeedPosts } from '@/actions/post';
import { Flex, Spin, Typography } from 'antd';
import { useInView } from 'react-intersection-observer';

const Posts = () => {
  const { ref, inView } = useInView();
  const checkLastViewRef = (index, page) => {
    if (index === page?.data?.length - 1) {
      return true;
    } else return false;
  };
  const { data, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
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
        <Typography>Wait a second... It is loading...</Typography>
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
                  borderRadius: '0.5rem',
                }}
                ref={ref}
              >
                <span>Post</span>
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
                <span>Post</span>
              </div>
            )
          )
        )}
      </Flex>
    );
  }
};
export default Posts;
