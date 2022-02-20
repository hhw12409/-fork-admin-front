import { combineReducers } from 'redux';
import layoutSlice from './slices/layout';

import userSlice from './slices/user';
// import orderSlice from '../slices/order';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  layout: layoutSlice.reducer,
  // order: orderSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;