import {
  ChangeEvent,
  FC,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import iconMagnifier from '../../../assets/img/icon-magnifier.png';
import iconClear from '../../../assets/img/icon-clear.png';
import classes from './Input.module.scss';
import clsx from 'clsx';
import { useDebounce } from '../../../hooks/useDebounce';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setSearchValue } from '../../../store/slices/filterSlice';
import { useAppSelector } from '../../../hooks/useAppSelector';

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={clsx(classes.baseInput, className)} {...props} />;
  },
);

BaseInput.displayName = 'BaseInput';

interface SearchInputProps extends BaseInputProps {}

export const SearchInput: FC<SearchInputProps> = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.filter.searchValue);

  const [localSearchValue, setLocalSearchValue] = useState<string>('');
  const debouncedSearch = useDebounce((str: string) => dispatch(setSearchValue(str)), 300);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalSearchValue(searchValue);
  }, []);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(event.target.value);
    debouncedSearch(event.target.value);
  };

  const clearHandler = () => {
    setLocalSearchValue('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  return (
    <div className={classes.searchInput}>
      <img
        className={clsx(classes.searchInput__magnifier, classes.searchInput__img)}
        src={iconMagnifier}
        alt="Magnifier"
      />
      <BaseInput
        ref={inputRef}
        value={localSearchValue}
        onChange={inputHandler}
        placeholder={'Найти...'}
        className={classes.searchInput__search}
        {...props}
      />
      {localSearchValue && (
        <img
          className={clsx(classes.searchInput__clear, classes.searchInput__img)}
          src={iconClear}
          alt="Clear"
          onClick={clearHandler}
        />
      )}
    </div>
  );
};
