'use client';

import React from 'react';
import css from '@/styles/profileData.module.css';
import ProfileTop from '@/components/ProfileTop';

const ProfileData = ({ userId }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.profile_data_container}>
        <ProfileTop />
      </div>
    </div>
  );
};

export default ProfileData;
