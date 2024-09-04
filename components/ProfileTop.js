import React, { useState } from 'react';
import css from '@/styles/profileTop.module.css';
import { Image } from 'antd';

const ProfileTop = (userId, data, isLoading, isError) => {
  const [bannerView, setBannerView] = useState(false);
  const { use } = useUser();
  const inputRef = useRef(null);
  const [banner, setBanner] = useState(null);
  return (
    <div className={css.profile_top_container}>
      <div className={css.banner} onClick={() => setBannerView(true)}>
        <Image
          src='/images/gym.jpg'
          alt='banner'
          width={'100%'}
          height={'15rem'}
          preview={{
            mask: null,
            visible: bannerView,
            onVisibleChange: (visible) => setBannerView(visible),
          }}
        />
      </div>
    </div>
  );
};

export default ProfileTop;
