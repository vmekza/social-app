'use client';
import React, { useState, useRef, useEffect } from 'react';
import css from '@/styles/profileTop.module.css';
import { Image, Button, Spin, Skeleton, Typography } from 'antd';
import { useUser } from '@clerk/nextjs';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { updateBanner } from '@/actions/user';
import Block from '@/components/Block/Block';
const { Text } = Typography;
const TABS = [
  {
    label: 'Profile',
    icon: 'solar:user-id-bold',
  },
  { label: 'Followers', icon: 'ph:heart-fill' },
  { label: 'Following', icon: 'fluent:people-20-filled' },
];

const ProfileTop = ({ userId, data, isLoading, isError }) => {
  const [bannerView, setBannerView] = useState(false);
  const { user } = useUser();
  const inputRef = useRef(null);
  const [banner, setBanner] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: updateBanner,
    onSuccess: () => {
      toast.success('Banner updated successfully');
    },
    onError: () => {
      toast.error('Failed to update banner');
    },
  });

  useEffect(() => {
    if (data?.data?.banner_url) {
      setBanner(data?.data?.banner_url);
    }
  }, [data, setBanner]);

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
      <Spin spinning={isPending}>
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
      </Spin>
      <Block className={css.profile_top_footer}>
        <div className={css.footer_left}>
          <div className={css.footer_left_profile}>
            <div className={css.profile_image}>
              <Image
                src={data?.data?.image_url || '/images/logo.png'}
                alt='profile'
                preview={{ mask: null }}
              />
            </div>
            <div className={css.profile_info}>
              {!isLoading ? (
                <>
                  <Text className={'profileType'}>
                    {data?.data?.first_name} {data?.data?.last_name}
                  </Text>
                  <Text className={'bodyType'} type='secondary'>
                    @{data?.data?.username}
                  </Text>
                </>
              ) : (
                <Skeleton style={{ width: '9rem' }} paragraph={{ rows: 2 }} />
              )}
            </div>
          </div>
        </div>
        <div className={css.footer_right}>right side</div>
      </Block>
    </div>
  );
};

export default ProfileTop;
