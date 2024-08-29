import React from 'react';
import css from '@/styles/home.module.css';
import PostForm from '@/components/PostForm';
import Posts from '@/components/Posts';
import Trends from '@/components/Trends';

const Home = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.left}>
        <PostForm />
        <Posts />
      </div>
      <div className={css.right}>
        <Trends />
        <div className={css.right_suggestions}>Suggestions</div>
      </div>
    </div>
  );
};

export default Home;
