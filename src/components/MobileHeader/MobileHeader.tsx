import React, { useState } from 'react';
import classes from './MobileHeader.module.scss';
import magnifierIcon from '../../assets/img/icon-magnifier.png';
import Logo from '../Logo/Logo';
import BurgerButton from '../UI/BurgerButton/BurgerButton';
import SearchPopup from '../SearchPopup/SearchPopup';
import CategoriesMenu from '../CategoriesMenu/CategoriesMenu';
import BasketButton from '../UI/BasketButton/BasketButton';
import { Link, useLocation } from 'react-router-dom';

const MobileHeader = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [popupActive, setPopupActive] = useState<boolean>(false);

  const { pathname: path } = useLocation();

  return (
    <div className={classes.mobileHeader}>
      <div className={classes.mobileHeader__row}>
        {path === '/' && (
          <div className={classes.mobileHeader__col}>
            <BurgerButton menuActive={menuActive} setMenuActive={setMenuActive} />
            <CategoriesMenu menuActive={menuActive} setMenuActive={setMenuActive} />
            <div
              className={classes.mobileHeader__magnifier}
              onClick={() => setPopupActive(!popupActive)}>
              <img src={magnifierIcon} alt="magnifierIcon" />
            </div>
            <SearchPopup popupActive={popupActive} setPopupActive={setPopupActive} />
          </div>
        )}
        <Logo className={classes.mobileHeader__logo} />
        <Link to={'/cart'}>
          <BasketButton size={'small'} />
        </Link>
      </div>
    </div>
  );
};

export default MobileHeader;
