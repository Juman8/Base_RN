import {createSlice} from '@reduxjs/toolkit';
import {APP_SLICE} from '@types';
import {bottomStatusInterface} from '../types';

const initialState = {
  status: true,
} as bottomStatusInterface;

const bottomSlice = createSlice({
  name: APP_SLICE.BOTTOM_SLICE,
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const {setStatus} = bottomSlice.actions;
export default bottomSlice.reducer;
