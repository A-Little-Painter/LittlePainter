import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

interface CounterState {
  isDrawLineThicknessModalVisible: boolean;
  isOriginCompareModalVisible: boolean;
  isOriginPictureModalVisible: boolean;
  LineThickness: number;
  isDrawColorPaletteModalVisible: boolean;
  drawColorSelect: string;
  // 스크린샷 관련 모달
  isDrawScreenshotModalVisible: boolean;
  isSaveDrawnToLoginModalVisible: boolean;
  // 그림이미지 테스트 비교 모달
  isTestDrawCompareModalVisible: boolean;
}

const initialState: CounterState = {
  isDrawLineThicknessModalVisible: false,
  isOriginCompareModalVisible: false,
  isOriginPictureModalVisible: false,
  LineThickness: 10,
  // 테스트 후 적용여부 결정
  isDrawColorPaletteModalVisible: false,
  drawColorSelect: 'black',
  isDrawScreenshotModalVisible: false,
  isSaveDrawnToLoginModalVisible: false,
  // 그림이미지 테스트 비교 모달
  isTestDrawCompareModalVisible: false,
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
    handleisOriginPictureModalVisible: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isOriginPictureModalVisible = action.payload;
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
    // 스크린샷관련 모달
    handleIsDrawScreenshotModalVisible: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isDrawScreenshotModalVisible = action.payload;
    },
    // 그림 저장 시 로그인 모달
    handleisSaveDrawnToLoginModalVisible: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isSaveDrawnToLoginModalVisible = action.payload;
    },
    // 그림이미지 테스트 비교 모달
    handleisTestDrawCompareModalVisible: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isTestDrawCompareModalVisible = action.payload;
    },
  },
});

export const {
  handleLineThickness,
  handleisDrawLineThicknessModalVisible,
  handleisOriginCompareModalVisible,
  handleisOriginPictureModalVisible,
  handleisDrawColorPaletteModalVisible,
  handleDrawColorSelect,
  handleIsDrawScreenshotModalVisible,
  handleisSaveDrawnToLoginModalVisible,
  handleisTestDrawCompareModalVisible, // 임시 그림 비교 모달
} = drawSlice.actions;
export const LineThickness = (state: RootState) => state.draw.LineThickness;
export const isDrawLineThicknessModalVisible = (state: RootState) =>
  state.draw.isDrawLineThicknessModalVisible;
export const isOriginCompareModalVisible = (state: RootState) =>
  state.draw.isOriginCompareModalVisible;
export const isOriginPictureModalVisible = (state: RootState) =>
  state.draw.isOriginPictureModalVisible;
export const isDrawColorPaletteModalVisible = (state: RootState) => {
  state.draw.isDrawColorPaletteModalVisible;
};
export const isDrawScreenshotModalVisible = (state: RootState) => {
  state.draw.isDrawScreenshotModalVisible;
};
export const isSaveDrawnToLoginModalVisible = (state: RootState) => {
  state.draw.isSaveDrawnToLoginModalVisible;
};
export const drawColorSelect = (state: RootState) => state.draw.drawColorSelect;
// 임시 그림 비교 모달
export const isTestDrawCompareModalVisible = (state: RootState) => {
  state.draw.isTestDrawCompareModalVisible;
};
export default drawSlice.reducer;
