'use client';
import React, { useState, useRef, useEffect } from 'react';
import css from '@/styles/profileTop.module.css';
import { Image, Button } from 'antd';
import { useUser } from '@clerk/nextjs';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

const ProfileTop = ({ userId, data, isLoading, isError }) => {
  const [bannerView, setBannerView] = useState(false);
  const { user } = useUser();
  const inputRef = useRef(null);
  const [banner, setBanner] = useState(null);

  const handleBannerUpdate = async (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBanner(reader.result);
        mutate({
          id: user?.id,
          banner: reader.result,
          prevBannerId: data?.data?.banner_id,
        });
      };
    }
  };
  return (
    <div className={css.profile_top_container}>
      <div className={css.banner} onClick={() => setBannerView(true)}>
        <Image
          src={banner || '/images/gym.jpg'}
          alt='banner'
          width={'100%'}
          height={'15rem'}
          preview={{
            mask: null,
            visible: bannerView,
            onVisibleChange: (visible) => setBannerView(visible),
          }}
        />
        {userId === user?.id && (
          <div
            className={css.btn_edit}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <input
              accept='image/*'
              multiple={false}
              ref={inputRef}
              onChange={(e) => handleBannerUpdate(e)}
              type='file'
              hidden
            />
            <Button
              onClick={() => inputRef.current.click()}
              type='primary'
              shape='circle'
              style={{ background: 'var(--color-btn)' }}
              icon={<Icon icon='ep:edit' width={'20px'} />}
            ></Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTop;
