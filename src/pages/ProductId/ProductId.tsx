import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct, IProductCart } from '../../components/types/types';
import { useFetching } from '../../hooks/useFetching';
import PostService from '../../API/PostService';
import classes from './ProductId.module.scss';
import ConfigurationSelector from '../../components/ConfigurationSelector/ConfigurationSelector';
import { AddProductButton, CommonButton } from '../../components/UI/Button/Button';
import { addProduct } from '../../store/slices/cartSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import ProductIdSkeleton from '../../components/ProductIdSkeleton/ProductIdSkeleton';
import { RotatingLines } from 'react-loader-spinner';
import { priceCalculation } from '../../utils/priceCalculation';
import { useMediaQuery } from 'react-responsive';

const ProductId = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isDesktopSize = useRef<boolean>(false);
  const isLaptopSize = useRef<boolean>(false);
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [productForCart, setProductForCart] = useState<IProductCart>({} as IProductCart);
  const [activeMemory, setActiveMemory] = useState<number>(0);
  const [activeColour, setActiveColour] = useState<number>(0);

  const dispatch = useAppDispatch();

  const productArr = useAppSelector((state) =>
    state.cart.products.filter((product) => product.id === id),
  );

  const productCount = productArr
    ? productArr.reduce((count, product) => product.count + count, 0)
    : 0;

  const [fetchProduct, isLoading, error] = useFetching(async () => {
    if (id) {
      const product = await PostService.getProductById(id);
      setProduct(product);
    }
  });

  useEffect(() => {
    fetchProduct().then();
  }, []);

  useEffect(() => {
    setProductForCart({
      id: product.id,
      image: product.image,
      title: product.title,
      memory: product.memory?.[activeMemory],
      colour: product.colours?.[activeColour],
      price: priceCalculation(product.price, activeMemory),
      count: 1,
    });
  }, [product, activeColour, activeMemory]);

  isDesktopSize.current = useMediaQuery({ query: '(max-width: 1200px)' });
  isLaptopSize.current = useMediaQuery({ query: '(max-width: 900px)' });

  return (
    <div className={classes.productIdContainer}>
      {error ? (
        <div className={classes.error}>
          <h2 className={classes.error__title}>Произошла ошибка ({error}).</h2>
          <div className={classes.error__description}>
            К сожалению, не загрузить товар. Попробуйте повторить попытку позже
          </div>
        </div>
      ) : isLoading ? (
        isDesktopSize.current ? (
          <div className={classes.loader}>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="72"
              visible={true}
            />
          </div>
        ) : (
          <ProductIdSkeleton />
        )
      ) : (
        <>
          <div className={classes.productId}>
            {isLaptopSize.current && (
              <div className={classes.productId__title}>{product.title}</div>
            )}
            <div className={classes.productId__col1}>
              <div className={classes.productId__img}>
                <img src={require(`../../assets/img/${product.image}HQ.png`)} alt={product.title} />
              </div>
              <ConfigurationSelector
                memory={product.memory}
                setActiveMemory={setActiveMemory}
                activeMemory={activeMemory}
                colours={product.colours}
                setActiveColour={setActiveColour}
                activeColour={activeColour}
              />
            </div>
            <div className={classes.productId__col2}>
              {!isLaptopSize.current && (
                <div className={classes.productId__title}>{product.title}</div>
              )}
              <ul className={classes.productId__characteristicsList}>
                {product.descriptionCharacteristics.map((characteristic, index) => (
                  <li key={index} className={classes.productId__characteristicItem}>
                    {characteristic}
                  </li>
                ))}
              </ul>
              {!isDesktopSize.current && (
                <div className={classes.productId__button}>
                  <div className={classes.productId__price}>
                    От {priceCalculation(product.price, activeMemory)} ₽
                  </div>
                  <AddProductButton
                    size={'medium'}
                    onClick={() => dispatch(addProduct(productForCart))}>
                    {productCount}
                  </AddProductButton>
                </div>
              )}
            </div>
          </div>
          {isDesktopSize.current && (
            <div className={classes.productId__button}>
              <div className={classes.productId__price}>
                От {priceCalculation(product.price, activeMemory)} ₽
              </div>
              <AddProductButton
                size={'medium'}
                onClick={() => dispatch(addProduct(productForCart))}>
                {productCount}
              </AddProductButton>
            </div>
          )}
        </>
      )}
      <div className={classes.backButton}>
        <CommonButton
          onClick={() => navigate(-1)}
          variant={'secondary'}
          size={'medium'}
          borderWidth={'medium'}>
          Вернуться назад
        </CommonButton>
      </div>
    </div>
  );
};

export default ProductId;
