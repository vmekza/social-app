import React from 'react';
import css from '@/styles/home.module.css';

const Home = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.left}>
        <span className={css.left_postForm}></span>
        <span classname={css.left_posts}></span>
      </div>
      <div className={css.right}>
        <div className={css.right_trends}></div>
        <div className={css.right_suggestions}></div>
      </div>
    </div>
  );
};

export default Home;
