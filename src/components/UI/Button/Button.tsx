import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import classes from './Button.module.scss';
import plusIcon from '../../../assets/img/icon-plus.png';
import minusIcon from '../../../assets/img/icon-minus.png';
import deleteIcon from '../../../assets/img/icon-delete.png';

const sizeStyle = {
  xsmall: classes.sizeXSmall,
  small: classes.sizeSmall,
  medium: classes.sizeMedium,
  large: classes.sizeLarge,
};

const borderWidthStyle = {
  thin: classes.borderThin,
  medium: classes.borderMedium,
  thick: classes.borderThick,
};

interface BaseButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const BaseButton: FC<BaseButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={clsx(classes.baseBtn, className)} {...props}>
      {children}
    </button>
  );
};

interface AddProductButtonProps extends BaseButtonProps {
  active?: boolean;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  borderWidth?: 'thin' | 'medium' | 'thick';
}

export const AddProductButton: FC<AddProductButtonProps> = ({
  children,
  size = 'xsmall',
  borderWidth = 'medium',
  ...props
}) => {
  return (
    <BaseButton
      className={clsx(classes.addProductBtn, sizeStyle[size], borderWidthStyle[borderWidth])}
      {...props}>
      + Добавить{' '}
      {children !== 0 && <span className={classes.addProductBtn__count}>{children}</span>}
    </BaseButton>
  );
};

interface CommonButtonProps extends BaseButtonProps {
  active?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  borderWidth?: 'thin' | 'medium' | 'thick';
}

const variantStyle = {
  primary: classes.commonBtn__primary,
  secondary: classes.commonBtn__secondary,
};

export const CommonButton: FC<CommonButtonProps> = ({
  children,
  active = false,
  size = 'small',
  variant = 'primary',
  borderWidth = 'thin',
  ...props
}) => {
  return (
    <BaseButton
      className={clsx(
        classes.commonBtn,
        active && classes.commonBtn__active,
        variantStyle[variant],
        sizeStyle[size],
        borderWidthStyle[borderWidth],
      )}
      {...props}>
      {children}
    </BaseButton>
  );
};

interface CartItemButtonProps extends BaseButtonProps {
  action?: 'plus' | 'minus' | 'delete';
}

export const CartItemButton: FC<CartItemButtonProps> = ({
  children,
  action = 'plus',
  ...props
}) => {
  const icons = {
    plus: plusIcon,
    minus: minusIcon,
    delete: deleteIcon,
  };

  return (
    <BaseButton className={classes.cartItemBtn} {...props}>
      <img src={icons[action]} alt="action" />
    </BaseButton>
  );
};
