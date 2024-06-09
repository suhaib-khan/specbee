import React from 'react';
import Skeleton from '../components/Skeleton';

const CategoryLoader = () => {
  return (
    <>
      {[...Array.from({ length: 3 })]?.map((_, index) => (
        <div className='category_loader' key={index}>
          <Skeleton />
        </div>
      ))}
    </>
  );
};

export default CategoryLoader;
