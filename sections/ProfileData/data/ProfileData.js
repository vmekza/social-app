'use client';

import React from 'react';
import css from '@/styles/profileData.module.css';
import ProfileTop from '@/components/ProfileTop';
import { getUser } from '@/actions/user';
import { useQuery } from '@tanstack/react-query';

const ProfileData = ({ userId }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
  });

  const [tab, setTab] = React.useState('1');

  return (
    <div className={css.wrapper}>
      <div className={css.profile_data_container}>
        <ProfileTop
          data={data}
          isLoading={isLoading}
          isError={isError}
          userId={userId}
          tab={tab}
          setTab={setTab}
        />
        {tab === '1' && <ProfileBody userId={userId} />}
      </div>
    </div>
  );
};

export default ProfileData;
