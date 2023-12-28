import React, { FC, useState } from 'react';
import classes from './ProductCard.module.scss';
import { AddProductButton } from '../UI/Button/Button';
import { IProduct, IProductCart } from '../types/types';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addProduct } from '../../store/slices/cartSlice';
import ConfigurationSelector from '../ConfigurationSelector/ConfigurationSelector';
import { useNavigate } from 'react-router-dom';
import { priceCalculation } from '../../utils/priceCalculation';

const ProductCard: FC<IProduct> = ({ id, image, title, memory, colours, price }) => {
  const [activeMemory, setActiveMemory] = useState<number>(0);
  const [activeColour, setActiveColour] = useState<number>(0);

  const navigate = useNavigate();

  const productProps: IProductCart = {
    id: id,
    image,
    title,
    memory: memory[activeMemory],
    colour: colours[activeColour],
    price: priceCalculation(price, activeMemory),
    count: 1,
  };

  const dispatch = useAppDispatch();

  const productArr = useAppSelector((state) =>
    state.cart.products.filter((product) => product.id === id),
  );

  const productCount = productArr
    ? productArr.reduce((count, product) => product.count + count, 0)
    : 0;

  return (
    <div className={classes.productCard}>
      <div onClick={() => navigate(`/product/${id}`)} className={classes.productCard__imgShadow}>
        <div className={classes.productCard__img}>
          <img src={require(`../../assets/img/${image}.png`)} alt="product" />
        </div>
      </div>
      <div className={classes.productCard__title}>{title}</div>
      <ConfigurationSelector
        memory={memory}
        setActiveMemory={setActiveMemory}
        activeMemory={activeMemory}
        colours={colours}
        setActiveColour={setActiveColour}
        activeColour={activeColour}
      />
      <div className={classes.productCard__button}>
        <div className={classes.productCard__price}>
          От {priceCalculation(price, activeMemory)} ₽
        </div>
        <AddProductButton onClick={() => dispatch(addProduct(productProps))}>
          {productCount}
        </AddProductButton>
      </div>
    </div>
  );
};

export default ProductCard;
