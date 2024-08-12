'use client';
import React from 'react';
import css from '@/styles/nav.module.css';
import Block from '@/components/Block/Block';
import { navRoutes } from '@/lib/navRoutes';
import Link from 'next/link';
import { Typography } from 'antd';
import { Icon } from '@iconify/react';
import { usePathname, useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import cx from 'classnames';

const Navigation = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  const pathname = usePathname();
  const isActiveTab = (route) => {
    if (router.route === pathname) return css.active;
  };

  return (
    <div className={css.wrapper}>
      <Block className={css.nav_container}>
        {' '}
        {navRoutes().map((route, index) => (
          <Link
            className={cx(css.nav_link, isActiveTab(route))}
            key={index}
            href={route.route}
          >
            <Typography>
              <Icon icon={route.icon} width={'25px'} />
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
  );
};

export default Navigation;
