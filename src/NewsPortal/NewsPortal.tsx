import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getNews } from '../redux/newsSlice';
import Filters from './Filters';
import NewsListing from './NewsListing';
import Pagination from './Pagination';

const NewsPortal = () => {
  const dispatch = useAppDispatch();

  const { isLoading, news } = useAppSelector((state) => state.news);
  const [sources, setSources] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [newsList, setNewsList] = useState<[] | any>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [isDescending, setIsDescending] = useState<boolean>(true);
  const [sortType, setSortType] = useState<string>(`date`);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  useEffect(() => {
    if (news?.length > 0) {
      const sources = news?.map((newsItem) => newsItem?.['source']);
      const uniqueSources = Array.from(new Set(sources));
      setSources(uniqueSources);

      const authors = news?.map((newsItem) => newsItem?.['author']);
      const uniqueAuthors = Array.from(new Set(authors));
      setAuthors(uniqueAuthors);
    }
  }, [news]);

  useEffect(() => {
    const newsPerPage = 5;
    const lastIndex = pageNumber * newsPerPage;
    const firstIndex = lastIndex - newsPerPage;
    let newsList = [...news]?.sort(
      (a: any, b: any) =>
        new Date(b?.date)?.getDate() - new Date(a?.date)?.getDate()
    );
    if (news?.length) {
      if (!selectedAuthor && !selectedSource) {
        setTotalItems(newsList?.length);
        setNewsList(newsList?.slice(firstIndex, lastIndex));
      }
      if (selectedAuthor && selectedSource) {
        const list = newsList?.filter(
          (news: any) =>
            news?.source === selectedSource && news?.author === selectedAuthor
        );
        setTotalItems(list?.length);
        setNewsList(list?.slice(firstIndex, lastIndex));
      }
      if (selectedAuthor && !selectedSource) {
        const list = newsList?.filter(
          (news: any) => news?.author === selectedAuthor
        );
        setTotalItems(list?.length);
        setNewsList(list?.slice(firstIndex, lastIndex));
      }
      if (!selectedAuthor && selectedSource) {
        const list = newsList?.filter(
          (news: any) => news?.source === selectedSource
        );
        setTotalItems(list?.length);
        setNewsList(list?.slice(firstIndex, lastIndex));
      }
    }
  }, [pageNumber, selectedAuthor, selectedSource, news]);

  const onPageChange = (page: number) => {
    setPageNumber(page);
  };

  return (
    <div className='news_portal_container'>
      <div className='news_portal_wrapper'>
        <Filters
          sources={sources}
          authors={authors}
          selectedAuthor={selectedAuthor}
          setSelectedAuthor={setSelectedAuthor}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
          sortType={sortType}
          setSortType={setSortType}
          isDescending={isDescending}
          setIsDescending={setIsDescending}
          newsList={newsList}
          setNewsList={setNewsList}
          isLoading={isLoading}
        />
        <NewsListing news={newsList} isLoading={isLoading} />
      </div>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={5}
        currentPage={pageNumber}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default NewsPortal;
