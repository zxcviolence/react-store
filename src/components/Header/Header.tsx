import React, { FC } from 'react';
import classes from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { SearchInput } from '../UI/Input/Input';
import Logo from '../Logo/Logo';
import BasketButton from '../UI/BasketButton/BasketButton';

const Header: FC = () => {
  const { pathname: path } = useLocation();
  return (
    <div className={classes.header}>
      <div className={classes.header__row}>
        <Logo />
        {path === '/' && <SearchInput />}
        <Link to={'/cart'}>
          <BasketButton size={'medium'} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
