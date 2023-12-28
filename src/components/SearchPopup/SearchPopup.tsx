import React, { Dispatch, FC, KeyboardEvent, SetStateAction } from 'react';
import classes from './SearchPopup.module.scss';
import { SearchInput } from '../UI/Input/Input';

interface SearchPopupProps {
  popupActive: boolean;
  setPopupActive: Dispatch<SetStateAction<boolean>>;
}

const SearchPopup: FC<SearchPopupProps> = ({ popupActive, setPopupActive }) => {
  const inputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setPopupActive(false);
    }
  };

  if (popupActive) {
    return (
      <div onClick={() => setPopupActive(false)} className={classes.searchPopup}>
        <div onClick={(e) => e.stopPropagation()} className={classes.searchPopup__content}>
          <SearchInput onKeyDown={(e) => inputHandler(e)} />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default SearchPopup;
