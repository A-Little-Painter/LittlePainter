import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

interface CounterState {
  isVolume: number;
  isMusic: string;
  isEffect: string;
  isLoop: number;
}

const initialState: CounterState = {
  isVolume: 1,
  isMusic: '',
  isEffect: '',
  isLoop: -1,
};

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    // 볼륨조절: 숫자 0~1까지
    handleBGMVolume: (state, action: PayloadAction<number>) => {
      state.isVolume = action.payload;
    },
    // 노래선택: url을 문자열로
    handleBGMMusic: (state, action: PayloadAction<string>) => {
      state.isMusic = action.payload;
    },
    // 효과음선택: url을 문자열로
    handleSoundEffect: (state, action: PayloadAction<string>) => {
      state.isEffect = action.payload;
    },
    // 효과음반복: 페이지 리딩에서는 0 반복X, 나머지는 -1로 반복O
    handleIsLoop: (state, action: PayloadAction<number>) => {
      console.log('되나', state.isLoop);
      state.isLoop = action.payload;
    },
  },
});

export const {
  handleBGMVolume,
  handleBGMMusic,
  handleSoundEffect,
  handleIsLoop,
} = musicSlice.actions;
export const isVolume = (state: RootState) => state.music.isVolume;
export const isMusic = (state: RootState) => state.music.isMusic;
export const isEffect = (state: RootState) => state.music.isEffect;
export const isLoop = (state: RootState) => state.music.isLoop;
export default musicSlice.reducer;
