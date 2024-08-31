import React from 'react';
import css from '@/styles/home.module.css';
import PostForm from '@/components/PostForm';
import Posts from '@/components/Posts';
import Trends from '@/components/Trends';

const Home = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.home_left}>
        <PostForm />
        <Posts />
      </div>
      <div className={css.home_right}>
        <Trends />
        <div className={css.home_right_suggestions}>Suggestions</div>
      </div>
    </div>
  );
};

export default Home;
