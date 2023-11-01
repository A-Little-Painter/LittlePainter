import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

interface CounterState {
  isTalePageScriptModalVisible: boolean;
}

const initialState: CounterState = {
  isTalePageScriptModalVisible: false,
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
  },
});

export const {handleisTalePageScriptModalVisible} = taleSlice.actions;

export const isTalePageScriptModalVisible = (state: RootState) =>
  state.tale.isTalePageScriptModalVisible;
export default taleSlice.reducer;
