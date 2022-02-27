import { combineReducers } from "redux";
import layoutSlice from "./slices/layout";
import perfumeSlice from "./slices/perfume";

import userSlice from "./slices/user";
// import orderSlice from '../slices/order';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  layout: layoutSlice.reducer,
  perfume: perfumeSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
