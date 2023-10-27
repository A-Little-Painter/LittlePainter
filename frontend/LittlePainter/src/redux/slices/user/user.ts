import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

interface CounterState {
  testValue: number;
  practiceValue: number;
  isLogin: boolean;
  isAddKids: boolean;
}

const initialState: CounterState = {
  testValue: 0,
  practiceValue: 100,
  isLogin: false,
  isAddKids: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: state => {
      state.testValue += 1;
    },
    decrement: state => {
      state.testValue -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.testValue += action.payload;
    },
    decrementPracticeValue: (state, action: PayloadAction<number>) => {
      state.practiceValue -= action.payload;
    },
    logIn: state => {
      state.isLogin = true;
    },
    logOut: state => {
      state.isLogin = false;
    },
    addKids: state => {
      state.isAddKids = true;
    },
    updateKids: state => {
      state.isAddKids = false;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  decrementPracticeValue,
  logIn,
  logOut,
  updateKids,
  addKids,
} = userSlice.actions;
export const selectCount = (state: RootState) => state.user.testValue;
export const selectPracticeValue = (state: RootState) =>
  state.user.practiceValue;
export const isLogin = (state: RootState) => state.user.isLogin;
export const isAddKids = (state: RootState) => state.user.isAddKids;
export default userSlice.reducer;
