import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/user/user';
import drawSlice from './slices/draw/draw';
import taleSlice from './slices/tale/tale';

export const store = configureStore({
  reducer: {
    user: userSlice,
    draw: drawSlice,
    tale: taleSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
