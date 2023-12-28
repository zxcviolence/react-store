import React, { FC } from 'react';
import classes from './Pagination.module.scss';
import { usePagination } from '../../../hooks/usePagination';
import { CommonButton } from '../Button/Button';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setActivePage } from '../../../store/slices/paginationSlice';

const Pagination: FC = () => {
  const { totalPages, activePage } = useAppSelector((state) => state.pagination);
  const dispatch = useAppDispatch();

  const pagesArray = usePagination(totalPages);

  return (
    <div className={classes.pagination}>
      {pagesArray.map((page) => (
        <CommonButton
          variant={'secondary'}
          active={activePage === page}
          key={page}
          onClick={() => dispatch(setActivePage(page))}>
          {page}
        </CommonButton>
      ))}
    </div>
  );
};

export default Pagination;
