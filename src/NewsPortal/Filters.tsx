import React, { useState } from 'react';
import CategoryLoader from './CategoryLoader';

type FilterProps = {
  sources: string[];
  authors: string[];
  selectedAuthor: string;
  selectedSource: string;
  setSelectedAuthor: (value: string) => void;
  setSelectedSource: (value: string) => void;
  sortType: string;
  setSortType: (value: string) => void;
  isDescending: boolean;
  setIsDescending: (value: boolean) => void;
  newsList: [];
  setNewsList: (value: []) => void;
  isLoading: boolean;
};

const Filters = ({
  sources,
  authors,
  selectedAuthor,
  selectedSource,
  setSelectedAuthor,
  setSelectedSource,
  sortType,
  setSortType,
  isDescending,
  setIsDescending,
  newsList,
  setNewsList,
  isLoading,
}: FilterProps) => {
  const [isShowFilters, setIsShowFilters] = useState<boolean>(false);

  const onDescendHandler = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ): void => {
    setIsDescending(!isDescending);
    if (sortType === `date`) {
      const list = newsList?.sort(
        (a: any, b: any) =>
          new Date(!isDescending ? b.date : a.date)?.getDate() -
          new Date(!isDescending ? a.date : b.date)?.getDate()
      );
      setNewsList(list);
    }
    if (sortType === `title`) {
      const list = newsList?.sort((a: any, b: any) =>
        isDescending
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
      setNewsList(list);
    }
  };

  const onSortTypeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    sortType: string
  ): void => {
    setSortType(sortType);
    setIsDescending(true);
  };

  const onMenuClick = (): void => {
    setIsShowFilters(!isShowFilters);
  };

  return (
    <>
      {}
      <div className='hamburger' onClick={onMenuClick}>
        <svg viewBox='0 0 100 80' width='20' height='10'>
          <rect width='100' height='10' rx='10'></rect>
          <rect y='30' width='100' height='10' rx='10'></rect>
          <rect y='60' width='100' height='10' rx='10'></rect>
        </svg>
      </div>
      <div
        className={`filters_backdrop ${isShowFilters ? `show_backdrop` : null}`}
        onClick={onMenuClick}
      />
      <div
        className={`filters_wrapper ${
          isShowFilters ? `show_filters` : `hide_filters`
        }`}
      >
        <div className='category_wrapper'>
          <div className='title'>Source</div>
          <div className='categories'>
            {isLoading ? (
              <CategoryLoader />
            ) : (
              sources?.map((source) => {
                return (
                  <div className='category_item' key={source}>
                    <label className='checkbox_wrapper'>
                      <input
                        type='checkbox'
                        className='checkbox_wrapper'
                        checked={selectedSource === source}
                        onChange={(e) =>
                          setSelectedSource(e.target.checked ? source : '')
                        }
                      />
                      <span>{source}</span>
                    </label>
                  </div>
                );
              })
            )}
          </div>
        </div>
        {/* authors */}
        <div className='category_wrapper'>
          <div className='title'>Author</div>
          <div className='categories'>
            {isLoading ? (
              <CategoryLoader />
            ) : (
              authors?.map((author) => {
                return (
                  <div className='category_item' key={author}>
                    <label className='checkbox_wrapper'>
                      <input
                        type='checkbox'
                        className='checkbox_wrapper'
                        checked={selectedAuthor === author}
                        onChange={(e) =>
                          setSelectedAuthor(e.target.checked ? author : '')
                        }
                      />
                      <span>{author}</span>
                    </label>
                  </div>
                );
              })
            )}
          </div>
        </div>
        {/* sorting  */}
        <div className='category_wrapper'>
          <div className='title'>Sort By</div>
          <div className='categories'>
            {isLoading ? (
              <CategoryLoader />
            ) : (
              <>
                {' '}
                <div className='category_item sorting'>
                  <label className='checkbox_wrapper'>
                    <input
                      type='checkbox'
                      className='checkbox_wrapper'
                      checked={sortType === `date`}
                      onChange={(e) => onSortTypeHandler(e, `date`)}
                    />
                    <span>Date</span>
                  </label>
                  {sortType === `date` && (
                    <svg
                      className={`sorting_arrow ${
                        isDescending ? `down` : `up`
                      }`}
                      width='14'
                      height='14'
                      viewBox='0 0 14 20'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      onClick={onDescendHandler}
                    >
                      <path
                        d='M14 13L12.59 11.59L8 16.17L8 0H6L6 16.17L1.41 11.58L0 13L7 20L14 13Z'
                        fill='#171A1F'
                      />
                    </svg>
                  )}
                </div>
                <div className='category_item sorting'>
                  <label className='checkbox_wrapper'>
                    <input
                      type='checkbox'
                      className='checkbox_wrapper'
                      checked={sortType === `title`}
                      onChange={(e) => onSortTypeHandler(e, `title`)}
                    />
                    <span>Title</span>
                  </label>
                  {sortType === `title` && (
                    <svg
                      className={`sorting_arrow ${
                        isDescending ? `down` : `up`
                      }`}
                      width='14'
                      height='14'
                      viewBox='0 0 14 20'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      onClick={onDescendHandler}
                    >
                      <path
                        d='M14 13L12.59 11.59L8 16.17L8 0H6L6 16.17L1.41 11.58L0 13L7 20L14 13Z'
                        fill='#171A1F'
                      />
                    </svg>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
