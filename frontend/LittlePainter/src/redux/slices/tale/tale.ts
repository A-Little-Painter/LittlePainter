import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';
import {TaleDrawedImageType} from '../../../screens/fairytale/fairytaleType';

interface CounterState {
  isTalePageScriptModalVisible: boolean;
  isFairytaleEndingPageVisible: boolean;
  pageNum: number;
  taleDrawedImage: TaleDrawedImageType[];
  isDrawReadDone: boolean; // 그림 그리기하는 읽기도 끝인지
  isReReading: boolean; // 그림 다 그리고 재읽기 중인지
}

const initialState: CounterState = {
  isTalePageScriptModalVisible: false,
  isFairytaleEndingPageVisible: false,
  pageNum: 1,
  taleDrawedImage: [],
  isDrawReadDone: false,
  isReReading: false,
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
    handlePageNum: (state, action: PayloadAction<number>) => {
      console.log('페이지값:', action.payload);
      state.pageNum = action.payload;
    },
    handleTaleDrawedImageInitial: (state, action: PayloadAction<[]>) => {
      state.taleDrawedImage = action.payload;
    },
    // handleTaleDrawedImage: (
    //   state,
    //   action: PayloadAction<{
    //     characterName: string;
    //     pageNum: number;
    //     gifUri: string;
    //     drawUri: string;
    //   }>,
    // ) => {
    //   const addDrawedImage = {
    //     characterName: action.payload.characterName,
    //     contentUri: {
    //       gifUri: action.payload.gifUri,
    //       drawUri: action.payload.drawUri,
    //     },
    //   };
    //   state.taleDrawedImage.push(addDrawedImage);
    //   console.log('저장한 그림들', state.taleDrawedImage);
    // },
    handleTaleDrawedImage: (
      state,
      action: PayloadAction<{
        characterName: string;
        pageNum: number;
        gifUri: string;
        drawUri: string;
        characterPageId: number;
      }>,
    ) => {
      const addDrawedImage = {
        characterName: action.payload.characterName,
        talePageId: action.payload.characterPageId,
        contentUri: {
          gifUri: action.payload.gifUri,
          drawUri: action.payload.drawUri,
        },
      };

      // 존재하는 캐릭터의 인덱스 찾기
      const existingIndex = state.taleDrawedImage.findIndex(
        item => item.characterName === action.payload.characterName,
      );

      if (existingIndex >= 0) {
        // 존재하는 캐릭터라면, 새로운 데이터로 교체
        state.taleDrawedImage[existingIndex] = addDrawedImage;
      } else {
        // 존재하지 않는 캐릭터라면, 배열에 추가
        state.taleDrawedImage.push(addDrawedImage);
      }

      console.log('저장한 그림들', state.taleDrawedImage);
    },
    handleIsDrawReadDone: (state, action: PayloadAction<boolean>) => {
      console.log('값 isDrawReadDone:', action.payload);
      state.isDrawReadDone = action.payload;
    },
    handleIsReReading: (state, action: PayloadAction<boolean>) => {
      console.log('값 isReReading:', action.payload);
      state.isReReading = action.payload;
    },
  },
});

export const {
  handleisTalePageScriptModalVisible,
  handleisFairytaleEndingPageVisible,
  handlePageNum,
  handleTaleDrawedImageInitial,
  handleTaleDrawedImage,
  handleIsDrawReadDone,
  handleIsReReading,
} = taleSlice.actions;

export const isTalePageScriptModalVisible = (state: RootState) =>
  state.tale.isTalePageScriptModalVisible;
export const isFairytaleEndingPageVisible = (state: RootState) =>
  state.tale.isFairytaleEndingPageVisible;
export const pageNum = (state: RootState) => state.tale.pageNum;
export const taleDrawedImage = (state: RootState) => state.tale.taleDrawedImage;
export const isDrawReadDone = (state: RootState) => state.tale.isDrawReadDone;
export const isReReading = (state: RootState) => state.tale.isReReading;
export default taleSlice.reducer;
