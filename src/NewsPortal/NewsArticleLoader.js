import React from 'react';
import Skeleton from '../components/Skeleton';

const NewsArticleLoader = () => {
  return (
    <>
      {[...Array.from({ length: 5 })]?.map((_, index) => (
        <div className='news_article_loader_wrapper' key={index}>
          <div className='news_article_loader'>
            <div className='image'>
              <Skeleton />
            </div>
            <div className='content'>
              <Skeleton />
            </div>
          </div>
          <div className='description'>
            <Skeleton />
          </div>
          <div className='author'>
            <Skeleton />
          </div>
        </div>
      ))}
    </>
  );
};

export default NewsArticleLoader;
