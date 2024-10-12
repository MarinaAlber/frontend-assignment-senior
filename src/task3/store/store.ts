import { combineReducers, configureStore } from '@reduxjs/toolkit'
import formReducer from './slice';

const rootReducer= combineReducers({
  form: formReducer
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
export type AppStore = ReturnType<typeof setupStore>