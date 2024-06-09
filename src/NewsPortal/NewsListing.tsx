import React from 'react';
import NewsArticle from './NewsArticle';
import NewsArticleLoader from './NewsArticleLoader';

type NewsProps = {
  news: string[];
  isLoading: boolean;
};

const NewsListing = ({ news, isLoading }: NewsProps) => {
  return (
    <div className='news_listing_wrapper'>
      {isLoading ? (
        <NewsArticleLoader />
      ) : news?.length ? (
        news?.map((newsItem, index) => (
          <NewsArticle key={index} newsItem={newsItem} />
        ))
      ) : (
        <div className='no_results_found'>
          <span>No Results Found.</span>
        </div>
      )}
    </div>
  );
};

export default NewsListing;
