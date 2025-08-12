import { combineReducers, configureStore } from '@reduxjs/toolkit'
import taskListReducer from './taskSlice';
import { loadState, saveState } from 'src/utils/persist';

const persistedState = loadState();

const rootReducer = combineReducers({
  taskList: taskListReducer
})

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    preloadedState
  })
}

export const store = setupStore(persistedState)

store.subscribe(() => {
  saveState({
    ...store.getState()
  });
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;