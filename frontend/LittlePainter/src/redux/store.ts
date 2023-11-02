import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/user/user';
import drawSlice from './slices/draw/draw';
import uploadPicture from './slices/uploadPicture/uploadPicture';
import taleSlice from './slices/tale/tale';

export const store = configureStore({
  reducer: {
    user: userSlice,
    draw: drawSlice,
    uploadPicture: uploadPicture,
    tale: taleSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
