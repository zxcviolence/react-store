import { IProduct, ISort } from '../../components/types/types';
import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setTotalPages } from './paginationSlice';
import PostService from '../../API/PostService';

export const fetchProducts = createAsyncThunk<
  IProduct[],
  {
    activePage: number;
    limit: number;
    activeCategory: number;
    activeSort: ISort;
    searchValue: string;
  }
>(
  'products/fetchProducts',
  async ({ activePage, limit, activeCategory, activeSort, searchValue }, { dispatch }) => {
    const { data: products, totalCount } = await PostService.getProducts(
      activePage,
      limit,
      activeCategory,
      activeSort.sortProperty,
      activeSort.order,
      searchValue,
    );
    totalCount && dispatch(setTotalPages(Math.ceil(+totalCount / limit)));
    return products;
  },
);

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface productsState {
  products: IProduct[];
  status: Status;
}

const initialState: productsState = {
  products: [],
  status: Status.LOADING,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addMatcher(isPending, (state) => {
        state.status = Status.LOADING;
        state.products = [];
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = Status.SUCCESS;
      })
      .addMatcher(isError, (state) => {
        state.status = Status.ERROR;
        state.products = [];
      });
  },
});

const isPending = (action: AnyAction) => {
  return action.type.endsWith('pending');
};

const isFulfilled = (action: AnyAction) => {
  return action.type.endsWith('fulfilled');
};

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export default productsSlice.reducer;
