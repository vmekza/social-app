import React from 'react';
import css from '@/styles/loginLayout.module.css';

export const metadata = {
  title: 'Authentication',
};
const LoginLayout = ({ children }) => {
  return (
    <div className={css.loginLayout}>
      <video
        src='BGlogin.mp4'
        autoPlay
        muted
        loop
        className={css.backgroundVideo}
      />
      <div className={css.content}>
        <div>
          <p className={css.appName}>Brag Zone</p>
          <p className={css.tagline}>Where Every Flex Tells a Story</p>
          <p className={css.tagline2}>Share Yours</p>
        </div>
        <div className={css.signInContainer}>{children}</div>
      </div>
    </div>
  );
};

export default LoginLayout;
