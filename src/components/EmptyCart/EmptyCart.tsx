import React from 'react';
import classes from './EmptyCart.module.scss';
import { CommonButton } from '../UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import trolley from '../../assets/img/trolley.png';

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className={classes.title}>Корзина пустая!</h1>
      <div className={classes.description}>
        Вероятней всего, вы ничего не заказали. Для заказа перейдите на главную страницу.
      </div>
      <div className={classes.img}>
        <img src={trolley} alt="trolley" />
      </div>
      <div className={classes.button}>
        <CommonButton
          onClick={() => navigate(-1)}
          variant={'secondary'}
          size={'medium'}
          borderWidth={'medium'}>
          Вернуться назад
        </CommonButton>
      </div>
    </>
  );
};

export default EmptyCart;
