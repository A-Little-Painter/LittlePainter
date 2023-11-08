import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

interface CounterState {
  isTalePageScriptModalVisible: boolean;
  isFairytaleEndingPageVisible: boolean;
  isDrawnFairytale: boolean;
}

const initialState: CounterState = {
  isTalePageScriptModalVisible: false,
  isFairytaleEndingPageVisible: false,
  isDrawnFairytale: false,
};

export const taleSlice = createSlice({
  name: 'tale',
  initialState,
  reducers: {
    handleisTalePageScriptModalVisible: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isTalePageScriptModalVisible = action.payload;
    },
    handleisFairytaleEndingPageVisible: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isFairytaleEndingPageVisible = action.payload;
    },
    handleisDrawnFairytale: (state, action: PayloadAction<boolean>) => {
      state.isDrawnFairytale = action.payload;
    },
  },
});

export const {
  handleisTalePageScriptModalVisible,
  handleisFairytaleEndingPageVisible,
  handleisDrawnFairytale,
} = taleSlice.actions;

export const isTalePageScriptModalVisible = (state: RootState) =>
  state.tale.isTalePageScriptModalVisible;
export const isFairytaleEndingPageVisible = (state: RootState) =>
  state.tale.isFairytaleEndingPageVisible;
export const isDrawnFairytale = (state: RootState) =>
  state.tale.isDrawnFairytale;
export default taleSlice.reducer;
