import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

interface CounterState {
  isVolume: number;
  isMusic: string;
  isEffect: string;
}

const initialState: CounterState = {
  isVolume: 1,
  isMusic: '',
  isEffect: '',
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
  },
});

export const {handleBGMVolume, handleBGMMusic, handleSoundEffect} =
  musicSlice.actions;
export const isVolume = (state: RootState) => state.music.isVolume;
export const isMusic = (state: RootState) => state.music.isMusic;
export const isEffect = (state: RootState) => state.music.isEffect;
export default musicSlice.reducer;
