import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

interface CounterState {
  testValue: number;
  practiceValue: number;
}

const initialState: CounterState = {
  testValue: 0,
  practiceValue: 100,
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
  },
});

export const {increment, decrement, incrementByAmount, decrementPracticeValue} =
  userSlice.actions;
export const selectCount = (state: RootState) => state.user.testValue;
export const selectPracticeValue = (state: RootState) =>
  state.user.practiceValue;
export default userSlice.reducer;
