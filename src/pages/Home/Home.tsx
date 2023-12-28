import React, { useEffect, useRef } from 'react';

import Categories from '../../components/Categories/Categories';
import Sort, { sortList } from '../../components/Sort/Sort';
import ProductCardSkeleton from '../../components/ProductCardSkeleton/ProductCardSkeleton';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/UI/Pagination/Pagination';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setActivePage } from '../../store/slices/paginationSlice';

import classes from './Home.module.scss';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setFiltersFromUrl } from '../../store/slices/filterSlice';
import { fetchProducts } from '../../store/slices/productsSlice';
import { useMediaQuery } from 'react-responsive';

const Home = () => {
  const { products, status } = useAppSelector((state) => state.products);
  const { searchValue, activeCategory, activeSort } = useAppSelector((state) => state.filter);
  const { activePage, totalPages, limit } = useAppSelector((state) => state.pagination);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const didUpdate = useRef(false);

  useEffect(() => {
    if (didUpdate.current) {
      const queryString = qs.stringify({
        activeCategory,
        activeSortProperty: activeSort.sortProperty,
        activeSortOrder: activeSort.order,
        activePage,
      });
      navigate(`?${queryString}`);
    }
    didUpdate.current = true;
  }, [activeCategory, activeSort, activePage]);

  useEffect(() => {
    if (window.location.search) {
      const UrlParams = qs.parse(window.location.search.substring(1));

      const category = Number(UrlParams.activeCategory);
      const sort = sortList.find(
        (sort) =>
          sort.sortProperty === UrlParams.activeSortProperty &&
          sort.order === UrlParams.activeSortOrder,
      );
      const page = Number(UrlParams.activePage);

      if (sort) {
        dispatch(setFiltersFromUrl({ category, sort }));
        dispatch(setActivePage(page));
      }

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    dispatch(setActivePage(1));
  }, [activeCategory, searchValue]);

  useEffect(() => {
    if (!isSearch.current) {
      dispatch(
        fetchProducts({
          activePage,
          limit,
          activeCategory,
          activeSort,
          searchValue,
        }),
      );
    }
    isSearch.current = false;
  }, [activeCategory, activeSort, activePage, searchValue]);

  /*
  Если нужно чтобы SeachInput работал без помощи запроса к бд
  const productsArray = products
    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => <ProductCard key={obj.id} {...obj} />);
  */

  return (
    <>
      <div className={classes.top}>
        {useMediaQuery({ query: '(min-width: 1201px)' }) && <Categories />}
        <Sort />
      </div>
      <div className={classes.title}>Все товары</div>
      {status === 'error' ? (
        <div className={classes.error}>
          <h2 className={classes.error__title}>Произошла ошибка.</h2>
          <div className={classes.error__description}>
            К сожалению, не загрузить товары. Попробуйте повторить попытку позже
          </div>
        </div>
      ) : (
        <div className={classes.items}>
          {status === 'loading'
            ? [...new Array(8)].map((value, index) => <ProductCardSkeleton key={index} />)
            : products.map((obj) => <ProductCard key={obj.id} {...obj} />)}
        </div>
      )}
      {totalPages > 1 && <Pagination />}
    </>
  );
};

export default Home;
