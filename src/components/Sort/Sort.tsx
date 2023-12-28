import React, { FC, useEffect, useRef, useState } from 'react';
import classes from './Sort.module.scss';
import clsx from 'clsx';
import { ISort } from '../types/types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setActiveSort } from '../../store/slices/filterSlice';

export const sortList: ISort[] = [
  { name: 'Популярности (по возрастанию)', sortProperty: 'rating', order: 'asc' },
  { name: 'Популярности (по убыванию)', sortProperty: 'rating', order: 'desc' },
  { name: 'Цене (по возрастанию)', sortProperty: 'price', order: 'asc' },
  { name: 'Цене (по убыванию)', sortProperty: 'price', order: 'desc' },
];

const Sort: FC = React.memo(() => {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const activeSort = useAppSelector((state) => state.filter.activeSort);

  const sortRef = useRef<HTMLDivElement>(null);

  const onClickSort = (index: ISort) => {
    dispatch(setActiveSort(index));
    setIsOpenPopup(!isOpenPopup);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsOpenPopup(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className={classes.sort}>
      <div className={classes.sort__text} onClick={() => setIsOpenPopup(!isOpenPopup)}>
        Сортировка по: <span>{activeSort.name}</span>
      </div>
      {isOpenPopup && (
        <div className={classes.sort__popup}>
          <ul className={classes.sort__list}>
            {sortList.map((sort) => (
              <li
                key={sort.name}
                onClick={() => onClickSort(sort)}
                className={clsx(
                  classes.sort__item,
                  activeSort.sortProperty === sort.sortProperty &&
                    activeSort.order === sort.order &&
                    classes.sort__active,
                )}>
                {sort.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
