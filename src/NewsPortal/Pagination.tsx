import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const onPageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const LeftArrowIcon = () => (
    <svg
      width='10'
      height='10'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15 6L9 12L15 18'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );

  const RightArrowIcon = () => (
    <svg
      width='10'
      height='10'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9 6L15 12L9 18'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );

  return (
    <div className='pagination_container'>
      <div className='pagination_wrapper'>
        <button
          className='pagination_nav'
          onClick={() => onPageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <LeftArrowIcon />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageClick(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          className='pagination_nav'
          onClick={() => onPageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <RightArrowIcon />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
