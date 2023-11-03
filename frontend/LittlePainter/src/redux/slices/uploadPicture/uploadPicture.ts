import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

interface CounterState {
  title: string;
  detail: string;
  pictureaddr: string;
}

const initialState: CounterState = {
  title: '',
  detail: '',
  pictureaddr: '',
};

export const uploadPictureSlice = createSlice({
  name: 'uploadPicture',
  initialState,
  reducers: {
    update: (
      state,
      action: PayloadAction<{
        title: string;
        detail: string;
        pictureaddr: string;
      }>,
    ) => {
      state.title = action.payload.title;
      state.detail = action.payload.detail;
      state.pictureaddr = action.payload.pictureaddr;
    },
  },
});

export const {update} = uploadPictureSlice.actions;
export const title = (state: RootState) => state.uploadPicture.title;
export const detail = (state: RootState) => state.uploadPicture.detail;
export const pictureaddr = (state: RootState) =>
  state.uploadPicture.pictureaddr;
export default uploadPictureSlice.reducer;
