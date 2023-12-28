import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface paginationState {
  totalPages: number;
  activePage: number;
  limit: number;
}

const initialState: paginationState = {
  totalPages: 1,
  activePage: 1,
  limit: 8,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setActivePage(state, action: PayloadAction<number>) {
      state.activePage = action.payload;
    },
  },
});

export const { setTotalPages, setActivePage } = paginationSlice.actions;

export default paginationSlice.reducer;
