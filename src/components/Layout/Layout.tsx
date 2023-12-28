import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import classes from './Layout.module.scss';
import MobileHeader from '../MobileHeader/MobileHeader';

const Layout = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        {useMediaQuery({ query: '(max-width: 1200px)' }) ? <MobileHeader /> : <Header />}
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
