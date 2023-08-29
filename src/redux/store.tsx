import rootReducer from './rootReducer';
import {persistStore, persistReducer} from 'redux-persist';
import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {AsyncStorage} from '@utils';
import {rootMiddle} from './rootApi';

const newAsyncStorage = {
  getItem: async (key: string) => {
    return await AsyncStorage.getString(key);
  },
  setItem: async (
    key: string,
    value: string | number | boolean | Uint8Array,
  ) => {
    return AsyncStorage.set(key, value);
  },
  removeItem: async (key: string) => {
    return AsyncStorage.delete(key);
  },
};

const persistConfig = {
  key: 'root',
  storage: newAsyncStorage,
  whitelist: ['accountSlice'],
  blackList: ['bottomTabSlice'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: __DEV__,
  middleware: rootMiddle,
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
