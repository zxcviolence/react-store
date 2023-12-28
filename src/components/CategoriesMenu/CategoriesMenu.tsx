import React, { Dispatch, FC, SetStateAction } from 'react';
import classes from './CategoriesMenu.module.scss';
import Categories from '../Categories/Categories';

interface CategoriesMenuProps {
  menuActive: boolean;
  setMenuActive: Dispatch<SetStateAction<boolean>>;
}

const CategoriesMenu: FC<CategoriesMenuProps> = ({ menuActive, setMenuActive }) => {
  if (menuActive) {
    return (
      <nav
        onClick={() => {
          setMenuActive(!menuActive);
        }}
        className={classes.categoriesMenu}>
        <Categories className={classes.categoriesMenu__content} buttonSize={'large'} />
      </nav>
    );
  } else {
    return <></>;
  }
};

export default CategoriesMenu;
