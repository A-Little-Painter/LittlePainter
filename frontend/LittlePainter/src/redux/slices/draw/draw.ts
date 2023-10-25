import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

interface CounterState {
  isDrawLineThicknessModalVisible: boolean;
  isOriginCompareModalVisible: boolean;
  LineThickness: number;
}

const initialState: CounterState = {
  isDrawLineThicknessModalVisible: false,
  isOriginCompareModalVisible: false,
  LineThickness: 5,
};

export const drawSlice = createSlice({
  name: 'draw',
  initialState,
  reducers: {
    handleLineThickness: (state, action: PayloadAction<number>) => {
      state.LineThickness = action.payload;
    },
    handleisDrawLineThicknessModalVisible: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isDrawLineThicknessModalVisible = action.payload;
    },
    handleisOriginCompareModalVisible: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isOriginCompareModalVisible = action.payload;
    },
  },
});

export const {
  handleLineThickness,
  handleisDrawLineThicknessModalVisible,
  handleisOriginCompareModalVisible,
} = drawSlice.actions;
export const LineThickness = (state: RootState) => state.draw.LineThickness;
export const isDrawLineThicknessModalVisible = (state: RootState) =>
  state.draw.isDrawLineThicknessModalVisible;
export const isOriginCompareModalVisible = (state: RootState) =>
  state.draw.isOriginCompareModalVisible;
export default drawSlice.reducer;
