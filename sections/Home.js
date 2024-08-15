import React from 'react';
import css from '@/styles/home.module.css';
import PostForm from '@/components/PostForm';

const Home = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.left}>
        <PostForm />
        <span classname={css.left_posts}>Posts</span>
      </div>
      <div className={css.right}>
        <div className={css.right_trends}>Trends</div>
        <div className={css.right_suggestions}>Suggestions</div>
      </div>
    </div>
  );
};

export default Home;
