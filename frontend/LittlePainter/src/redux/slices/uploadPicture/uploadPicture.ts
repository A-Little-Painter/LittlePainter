import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

interface CounterState {
  title: string;
  detail: string;
  pictureaddr: string;
  picturename: string;
  picturetype: string;
  animal_type: string;
  animal_type_num: number;
  border_image: string;
  trace_image: string;
  moving: boolean;
  destination: string;
}

const initialState: CounterState = {
  title: '',
  detail: '',
  pictureaddr: '',
  picturename: '',
  picturetype: '',
  animal_type: '',
  animal_type_num: 11,
  border_image: '',
  trace_image: '',
  moving: false,
  destination: '',
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
    update3: (state, action: PayloadAction<number>) => {
      state.animal_type_num = action.payload;
    },
    destinationUpdate: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
    },
  },
});

export const {update, update2, update3, destinationUpdate} =
  uploadPictureSlice.actions;
export const title = (state: RootState) => state.uploadPicture.title;
export const detail = (state: RootState) => state.uploadPicture.detail;
export const pictureaddr = (state: RootState) =>
  state.uploadPicture.pictureaddr;
export const picturename = (state: RootState) =>
  state.uploadPicture.picturename;
export const picturetpye = (state: RootState) =>
  state.uploadPicture.picturetype;
export const animal_type_num = (state: RootState) =>
  state.uploadPicture.animal_type_num;
export default uploadPictureSlice.reducer;
