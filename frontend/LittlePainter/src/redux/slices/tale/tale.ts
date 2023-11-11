import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

interface CounterState {
  isTalePageScriptModalVisible: boolean;
  isFairytaleEndingPageVisible: boolean;
  isDrawnFairytale: boolean;
  numberOfCharactersTodraw: number;
  drawingWaitingNumber: number;
}

const initialState: CounterState = {
  isTalePageScriptModalVisible: false,
  isFairytaleEndingPageVisible: false,
  isDrawnFairytale: false,
  numberOfCharactersTodraw: 0,
  drawingWaitingNumber: 0,
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
    handleNumberOfCharactersTodraw: (state, action: PayloadAction<number>) => {
      state.numberOfCharactersTodraw = action.payload;
    },
    handleDrawingWaitingNumber: (state, action: PayloadAction<number>) => {
      state.drawingWaitingNumber = action.payload;
    },
  },
});

export const {
  handleisTalePageScriptModalVisible,
  handleisFairytaleEndingPageVisible,
  handleisDrawnFairytale,
  handleNumberOfCharactersTodraw,
  handleDrawingWaitingNumber,
} = taleSlice.actions;

export const isTalePageScriptModalVisible = (state: RootState) =>
  state.tale.isTalePageScriptModalVisible;
export const isFairytaleEndingPageVisible = (state: RootState) =>
  state.tale.isFairytaleEndingPageVisible;
export const isDrawnFairytale = (state: RootState) =>
  state.tale.isDrawnFairytale;
export const numberOfCharactersTodraw = (state: RootState) =>
  state.tale.numberOfCharactersTodraw;
export const drawingWaitingNumber = (state: RootState) =>
  state.tale.drawingWaitingNumber;
export default taleSlice.reducer;
