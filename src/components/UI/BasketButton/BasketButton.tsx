import React, { FC } from 'react';
import classes from './BasketButton.module.scss';
import basketLogo from '../../../assets/img/icon-basket.png';
import { useAppSelector } from '../../../hooks/useAppSelector';
import clsx from 'clsx';

interface BasketButtonProps {
  size?: 'small' | 'medium';
}

const sizeStyle = {
  small: classes.sizeSmall,
  medium: classes.sizeMedium,
};
const BasketButton: FC<BasketButtonProps> = ({ size = 'medium' }) => {
  const { totalCount, totalPrice } = useAppSelector((state) => state.cart);
  return (
    <button className={clsx(classes.basketButton, sizeStyle[size])}>
      <div className={classes.basketButton__price}>{totalPrice} ₽</div>
      <div className={classes.basketButton__row}>
        <div className={classes.basketButton__img}>
          <img src={basketLogo} alt="basket" />
        </div>
        <div className={classes.basketButton__count}>{totalCount}</div>
      </div>
    </button>
  );
};

export default BasketButton;
