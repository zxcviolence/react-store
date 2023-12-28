import React, { FC, HTMLAttributes } from 'react';
import classes from './Categories.module.scss';
import { CommonButton } from '../UI/Button/Button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setActiveCategory } from '../../store/slices/filterSlice';
import clsx from 'clsx';

const categories = ['Все', 'Iphone', 'IPad', 'Mac', 'AirPods'];

interface CategoriesProps extends HTMLAttributes<HTMLDivElement> {
  buttonSize?: 'small' | 'medium' | 'large';
}

const Categories: FC<CategoriesProps> = React.memo(({ className, buttonSize = 'small' }) => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector((state) => state.filter.activeCategory);

  return (
    <div className={clsx(className, classes.categories)}>
      {categories.map((value, index) => (
        <CommonButton
          key={value}
          onClick={() => dispatch(setActiveCategory(index))}
          active={activeCategory === index}
          variant={'primary'}
          size={buttonSize}
          borderWidth={'medium'}>
          {value}
        </CommonButton>
      ))}
    </div>
  );
});

export default Categories;
