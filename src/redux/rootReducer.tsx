import {combineReducers} from 'redux';
// import  from './slices';
import accountSlice from './slices/accountSlice';
import bottomTabSlice from './slices/bottomTabSlice';

const rootReducer = combineReducers({
  accountSlice: accountSlice,
  bottomTabSlice: bottomTabSlice
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
