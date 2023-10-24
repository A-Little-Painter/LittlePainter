import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

interface CounterState {
  //   testValue: number;
  //   practiceValue: number;
  isDrawLineThicknessModalVisible: boolean;
  LineThickness: number;
}

const initialState: CounterState = {
  //   testValue: 0,
  //   practiceValue: 100,
  isDrawLineThicknessModalVisible: false,
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
  },
});

export const {handleLineThickness, handleisDrawLineThicknessModalVisible} =
  drawSlice.actions;
export const LineThickness = (state: RootState) => state.draw.LineThickness;
export const isDrawLineThicknessModalVisible = (state: RootState) =>
  state.draw.isDrawLineThicknessModalVisible;
export default drawSlice.reducer;
