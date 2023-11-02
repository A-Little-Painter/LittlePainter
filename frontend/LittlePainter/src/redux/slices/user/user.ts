import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

interface CounterState {
  testValue: number;
  practiceValue: number;
  isLogin: boolean;
  isAddKids: boolean;
  kidId: number;
  kidName: string;
  kidIcon: string;
  kidBirthday: string;
  selectId: number;
  selectName: string;
  selectImage: string;
  userEmail: string;
}

const initialState: CounterState = {
  testValue: 0,
  practiceValue: 100,
  isLogin: false,
  isAddKids: false,
  kidId: 0,
  kidName: '',
  kidIcon: '',
  kidBirthday: '',
  selectId: -1,
  selectName: '',
  selectImage: '',
  userEmail: '',
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
    updateKids: (
      state,
      action: PayloadAction<{
        nickname: string;
        birthday: string;
        id: number;
        iconUrl: string;
      }>,
    ) => {
      state.isAddKids = false;
      state.kidName = action.payload.nickname;
      state.kidBirthday = action.payload.birthday;
      state.kidId = action.payload.id;
      state.kidIcon = action.payload.iconUrl;
    },
    selected: (
      state,
      action: PayloadAction<{
        selectId: number;
        selectName: string;
        selectImage: string;
        userEmail: string;
      }>,
    ) => {
      state.selectId = action.payload.selectId;
      state.selectName = action.payload.selectName;
      state.selectImage = action.payload.selectImage;
      state.userEmail = action.payload.userEmail;
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
  selected,
} = userSlice.actions;
export const selectCount = (state: RootState) => state.user.testValue;
export const selectPracticeValue = (state: RootState) =>
  state.user.practiceValue;
export const isLogin = (state: RootState) => state.user.isLogin;
export const isAddKids = (state: RootState) => state.user.isAddKids;
export const selectId = (state: RootState) => state.user.selectId;
export const selectName = (state: RootState) => state.user.selectName;
export const selectImage = (state: RootState) => state.user.selectImage;
export default userSlice.reducer;
