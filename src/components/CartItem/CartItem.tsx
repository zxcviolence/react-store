import React, { FC } from 'react';
import classes from './CartItem.module.scss';
import clsx from 'clsx';
import { CartItemButton } from '../UI/Button/Button';
import { IProductCart } from '../types/types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { minusItem, plusItem, removeProduct } from '../../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';

const CartItem: FC<IProductCart> = ({ id, image, title, memory, colour, price, count }) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.cart.products);

  const removeProductClick = () => {
    if (window.confirm('Вы действительно хотите удалить товар?')) {
      dispatch(removeProduct({ id, memory, colour }));
    }
  };

  const onClickMinusHandler = () => {
    const product = products.find(
      (prod) => prod.id === id && prod.memory === memory && prod.colour === colour,
    );
    if (product && product.count === 1) {
      if (window.confirm('Вы действительно хотите удалить товар?')) {
        dispatch(removeProduct({ id, memory, colour }));
      }
    } else {
      dispatch(minusItem({ id, memory, colour }));
    }
  };

  return (
    <div className={classes.cartItem}>
      <div className={clsx(classes.cartItem__product, classes.product)}>
        <div onClick={() => navigate(`/product/${id}`)} className={classes.product__img}>
          <img src={require(`../../assets/img/${image}.png`)} alt="product IMG" />
        </div>
        <div className={classes.product__col}>
          <h3 className={classes.product__name}>{title}</h3>
          <div className={classes.product__configuration}>
            {memory && `${memory} GB, `} {colour}
          </div>
        </div>
      </div>
      <div className={clsx(classes.cartItem__count, classes.count)}>
        <CartItemButton onClick={onClickMinusHandler} action={'minus'} />
        <div className={classes.count__number}>{count}</div>
        <CartItemButton
          onClick={() => dispatch(plusItem({ id, memory, colour }))}
          action={'plus'}
        />
      </div>
      <div className={classes.cartItem__amount}>{price * count} ₽</div>
      <CartItemButton onClick={removeProductClick} action={'delete'} />
    </div>
  );
};

export default CartItem;
