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
        <p className={css.tagline}>
          For the Selfie Kings and Queens of the Gym World
        </p>
        <div className={css.signInContainer}>{children}</div>
      </div>
    </div>
  );
};

export default LoginLayout;
