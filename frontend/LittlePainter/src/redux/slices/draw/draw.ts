import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

interface CounterState {
  isDrawLineThicknessModalVisible: boolean;
  isOriginCompareModalVisible: boolean;
  LineThickness: number;
  // 테스트 후 적용여부 결정
  isDrawColorPaletteModalVisible: boolean;
  drawColorSelect: string;
}

const initialState: CounterState = {
  isDrawLineThicknessModalVisible: false,
  isOriginCompareModalVisible: false,
  LineThickness: 5,
  // 테스트 후 적용여부 결정
  isDrawColorPaletteModalVisible: false,
  drawColorSelect: 'black',
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
    handleisDrawColorPaletteModalVisible: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isDrawColorPaletteModalVisible = action.payload;
    },
    handleDrawColorSelect: (state, action: PayloadAction<string>) => {
      state.drawColorSelect = action.payload;
    },
  },
});

export const {
  handleLineThickness,
  handleisDrawLineThicknessModalVisible,
  handleisOriginCompareModalVisible,
  handleisDrawColorPaletteModalVisible,
  handleDrawColorSelect,
} = drawSlice.actions;
export const LineThickness = (state: RootState) => state.draw.LineThickness;
export const isDrawLineThicknessModalVisible = (state: RootState) =>
  state.draw.isDrawLineThicknessModalVisible;
export const isOriginCompareModalVisible = (state: RootState) =>
  state.draw.isOriginCompareModalVisible;
export const isDrawColorPaletteModalVisible = (state: RootState) => {
  state.draw.isDrawColorPaletteModalVisible;
};
export const drawColorSelect = (state: RootState) => state.draw.drawColorSelect;
export default drawSlice.reducer;
