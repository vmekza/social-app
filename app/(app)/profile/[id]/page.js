import React from 'react';
import ProfileData from '@/sections/ProfileData/data/ProfileData';

export const generateMetadata = (params) => {
  return {
    title: `${params?.searchParams?.person}'s profile page`,
    description: `Profile page of ${params?.params?.id}`,
  };
};
const ProfilePage = (params) => {
  return <ProfileData userId={params?.params?.id} />;
};

export default ProfilePage;
