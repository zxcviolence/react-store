import { createContext } from 'react';
import { ISearchContext } from '../components/types/types';

export const SearchContext = createContext<ISearchContext>({} as ISearchContext);
