import React from 'react';
import css from '@/styles/profileTop.module.css';
import { Image } from 'antd';

const ProfileTop = (userId, data, isLoading, isError) => {
  return (
    <div className={css.profile_top_container}>
      <div className={css.banner}>
        <Image
          src='/images/gym.jpg'
          alt='banner'
          width={'100%'}
          height={'15rem'}
        />
      </div>
    </div>
  );
};

export default ProfileTop;
