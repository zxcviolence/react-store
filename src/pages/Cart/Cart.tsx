import React from 'react';
import iconCart from '../../assets/img/icon-cart.png';
import iconTrash from '../../assets/img/icon-trash.png';
import { BaseButton, CommonButton } from '../../components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import classes from './Cart.module.scss';
import { useAppSelector } from '../../hooks/useAppSelector';
import { clearCart } from '../../store/slices/cartSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import EmptyCart from '../../components/EmptyCart/EmptyCart';

const Cart = () => {
  const navigate = useNavigate();

  const { products, totalCount, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const clearCartClick = () => {
    if (window.confirm('Вы действительно хотите очистить корзину?')) {
      dispatch(clearCart());
    }
  };

  if (!totalCount) {
    return <EmptyCart />;
  }

  return (
    <div className={classes.cartContainer}>
      <div className={classes.top}>
        <div className={classes.title}>
          <div className={classes.title__img}>
            <img src={iconCart} alt="icon-cart" />
          </div>
          <h1 className={classes.title__text}>Корзина</h1>
        </div>
        <BaseButton onClick={clearCartClick}>
          <div className={classes.clearCartBtn}>
            <div className={classes.clearCartBtn__img}>
              <img src={iconTrash} alt="icon-trash" />
            </div>
            <div className={classes.clearCartBtn__text}>Очистить корзину</div>
          </div>
        </BaseButton>
      </div>
      <div className={classes.items}>
        {products.map((product) => (
          <React.Fragment key={`${product.id}${product.memory}${product.colour}`}>
            <div className={classes.dividingLine} />
            <CartItem {...product} />
          </React.Fragment>
        ))}
      </div>
      <div className={classes.paymentInfo}>
        <div className={classes.paymentInfo__productCount}>
          Всего девайсов: <span>{totalCount} шт.</span>
        </div>
        <div className={classes.paymentInfo__orderAmount}>
          Сумма заказа: <span>{totalPrice} ₽</span>
        </div>
      </div>
      <div className={classes.buttons}>
        <CommonButton
          onClick={() => navigate(-1)}
          variant={'secondary'}
          size={'medium'}
          borderWidth={'medium'}>
          Вернуться назад
        </CommonButton>
        <CommonButton variant={'secondary'} size={'small'} borderWidth={'medium'}>
          Оплатить сейчас
        </CommonButton>
      </div>
    </div>
  );
};

export default Cart;
