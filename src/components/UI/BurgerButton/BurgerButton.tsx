import React, { FC } from 'react';
import classes from './BurgerButton.module.scss';
import clsx from 'clsx';

interface BurgerButtonProps {
  menuActive: boolean;
  setMenuActive: React.ComponentState;
}

const BurgerButton: FC<BurgerButtonProps> = ({ menuActive, setMenuActive }) => {
  return (
    <div
      className={clsx(menuActive && classes.active, classes.burgerButton)}
      onClick={() => setMenuActive(!menuActive)}>
      <span></span>
    </div>
  );
};

export default BurgerButton;
