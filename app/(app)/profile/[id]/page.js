import React from 'react';

export const generateMetaData = (params) => {
  return {
    title: `${params?.searchParams?.person}'s profile page`,
    description: `Profile page of ${params?.params?.id}`,
  };
};
const ProfilePage = () => {
  return <div>Profile Page</div>;
};

export default ProfilePage;
