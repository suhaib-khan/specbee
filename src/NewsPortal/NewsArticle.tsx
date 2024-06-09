import React from 'react';
import NewsPlaceHolderImage from '../images/news.jpeg';

type NewsArticleProps = {
  newsItem:
    | {
        title: string;
        body: string;
        author: string;
        source: string;
        date: Date;
      }
    | any;
};

const NewsArticle = ({ newsItem }: NewsArticleProps) => {
  return (
    <div className='news_article_wrapper'>
      <div className='news_details'>
        <div className='image'>
          <img src={NewsPlaceHolderImage} alt={newsItem?.title} />
        </div>
        <div className='date_title'>
          <div className='date_source'>
            <span className='date'>
              {newsItem?.date
                ? new Date(newsItem?.date)?.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : `Undated`}
            </span>
            <div className='source'>{newsItem?.source}</div>
          </div>

          <div className='title'>{newsItem?.title}</div>
        </div>
      </div>
      <div
        className='description'
        dangerouslySetInnerHTML={{ __html: newsItem?.body }}
      />
      <div className='author'>{newsItem?.author}</div>
    </div>
  );
};

export default NewsArticle;
