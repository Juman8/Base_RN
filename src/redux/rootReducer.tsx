import {combineReducers} from 'redux';
// import  from './slices';
import accountSlice from './user/userSlice';
import bottomTabSlice from './slices/bottomTabSlice';
import {baseApi} from './api';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  accountSlice: accountSlice,
  bottomTabSlice: bottomTabSlice
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
