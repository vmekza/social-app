'use client';
import React, { useCallback, useEffect, useState } from 'react';
import css from '@/styles/nav.module.css';
import Block from '@/components/Block/Block';
import { navRoutes } from '@/lib/navRoutes';
import Link from 'next/link';
import { Typography } from 'antd';
import { Icon } from '@iconify/react';
import { usePathname, useRouter } from 'next/navigation';
import { useClerk, useUser } from '@clerk/nextjs';
import cx from 'classnames';
import { useSettingContext } from '@/context/settings/setting-context';
import NavContainer from '@/components/NavContainer';

const Navigation = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const {
    settings: { isNavigationShow },
    setSettings,
  } = useSettingContext();

  const handleBurgerOpen = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      isNavigationShow: false,
    }));
  }, [setSettings]);

  const isActiveTab = (route) => {
    if (router.route === pathname) return css.active;
  };
  const { user } = useUser();
  return (
    mounted && (
      <NavContainer
        isBurgerOpen={isNavigationShow}
        setIsBurgerOpen={handleBurgerOpen}
      >
        <div className={css.wrapper}>
          <Block className={css.nav_container}>
            {' '}
            {navRoutes(user).map((route, index) => (
              <Link
                className={cx(css.nav_link, isActiveTab(route))}
                key={index}
                href={
                  route.route === `/profile/${user?.id}`
                    ? `${route.route}?person=${user?.firstName}`
                    : `${route.route}`
                }
              >
                <Typography>
                  <Icon icon={route.icon} width={'25px'} className={css.icon} />
                </Typography>
                <Typography className='subtitle2'>{route.name}</Typography>
              </Link>
            ))}
            <Link
              href=''
              className={css.nav_link}
              onClick={() => {
                signOut(() => router.push('sign-in'));
              }}
            >
              <Typography>
                <Icon icon={'material-symbols:logout-sharp'} width={'25px'} />
              </Typography>
              <Typography className='subtitle2'>Sign out</Typography>
            </Link>
          </Block>
        </div>
      </NavContainer>
    )
  );
};

export default Navigation;
