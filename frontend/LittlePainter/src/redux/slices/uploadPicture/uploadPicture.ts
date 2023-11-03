import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

interface CounterState {
  title: string;
  detail: string;
  pictureaddr: string;
  picturename: string;
  picturetype: string;
  animal_type: string;
  border_image: string;
  trace_image: string;
  moving: boolean;
}

const initialState: CounterState = {
  title: '',
  detail: '',
  pictureaddr: '',
  picturename: '',
  picturetype: '',
  animal_type: '',
  border_image: '',
  trace_image: '',
  moving: false,
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
        picturename: string;
        picturetype: string;
      }>,
    ) => {
      state.title = action.payload.title;
      state.detail = action.payload.detail;
      state.pictureaddr = action.payload.pictureaddr;
      state.picturename = action.payload.picturename;
      state.picturetype = action.payload.picturetype;
    },
    update2: (
      state,
      action: PayloadAction<{
        animal_type: string;
        border_image: string;
        trace_image: string;
        moving: boolean;
      }>,
    ) => {
      state.animal_type = action.payload.animal_type;
      state.border_image = action.payload.border_image;
      state.trace_image = action.payload.trace_image;
      state.moving = action.payload.moving;
    },
  },
});

export const {update, update2} = uploadPictureSlice.actions;
export const title = (state: RootState) => state.uploadPicture.title;
export const detail = (state: RootState) => state.uploadPicture.detail;
export const pictureaddr = (state: RootState) =>
  state.uploadPicture.pictureaddr;
export const picturename = (state: RootState) =>
  state.uploadPicture.picturename;
export const picturetpye = (state: RootState) =>
  state.uploadPicture.picturetype;
export default uploadPictureSlice.reducer;
