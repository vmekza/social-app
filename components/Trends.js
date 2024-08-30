import React from 'react';
import css from '@/styles/trends.module.css';
import Block from '@/components/Block/Block';
import { Flex, Typography, Alert, Avatar } from 'antd';
import { QueryClient } from '@tanstack/react-query';
import { getTrends } from '@/actions/post';
import AddIcon from './AddIcon';

const Trends = async () => {
  const queryClient = new QueryClient();
  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: ['trends'],
      queryFn: getTrends,
      staleTime: 1000 * 60 * 60 * 24,
    });
    return (
      <div className={css.wrapper}>
        <div className={css.trends_bg_icon}>
          <AddIcon
            icon={'iconamoon:trend-up'}
            width={'10rem'}
            style={{
              position: 'absolute',
              top: '0',
              right: '10',
              zIndex: '0',
              color: 'var( --color-btn-hover)',
              opacity: '0.3',
            }}
          />
        </div>
        <Block className={css.trends_container}>
          <Typography
            style={{ marginTop: '0.8rem', marginLeft: '1rem' }}
            className='subtitle2'
          >
            TOP TRENDS
          </Typography>
          <Flex vertical gap={'6px'}>
            {data.map((trend, index) => (
              <Flex key={index} gap={'1rem'} align='center'>
                <Avatar
                  width={'1rem'}
                  style={{
                    background: 'var(--color-primary)',
                    width: '2rem',
                    marginLeft: '1rem',
                  }}
                  icon={
                    <AddIcon
                      icon='pepicons-print:fire'
                      width='20px'
                      height='27px'
                    />
                  }
                />
                <Flex vertical>
                  <Typography className='subtitle2'>{trend.name}</Typography>
                  <Typography
                    className='dateType'
                    style={{ fontWeight: 'bold', color: 'gray' }}
                  >
                    {trend?._count?.name} Posts
                  </Typography>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Block>
      </div>
    );
  } catch (error) {
    return (
      <Alert
        message='Error'
        description='Unable to fetch trends'
        type='error'
        showIcon
      />
    );
  }
};

export default Trends;
