import React from 'react';
import icon404 from '../../assets/img/icon-404.png';
import classes from './NotFound.module.scss';
import { useNavigate } from 'react-router-dom';
import { CommonButton } from '../../components/UI/Button/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={classes.img}>
        <img src={icon404} alt="404" />
      </div>
      <h1 className={classes.title}>Ничего не найдено!</h1>
      <div className={classes.description}>
        К сожалению данная страница отсутствует в нашем интернет-магазине.
      </div>
      <div className={classes.button}>
        <CommonButton
          onClick={() => navigate(-1)}
          variant={'secondary'}
          size={'medium'}
          borderWidth={'medium'}>
          Вернуться назад
        </CommonButton>
      </div>
    </>
  );
};

export default NotFound;
