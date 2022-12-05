import { configureStore } from '@reduxjs/toolkit';
import columnsReducer from './reducers/columnsSlice';
import modalPopupReducer from './reducers/modalPopupSlice';
import langReducer from './reducers/langSlice';
import boardsReducer from './reducers/boardsSlice';
import tasksReducer from './reducers/tasksSlice';
import authReducer from './reducers/authSlice';

const store = configureStore({
  reducer: {
    columns: columnsReducer,
    modalPopup: modalPopupReducer,
    lang: langReducer,
    boards: boardsReducer,
    tasks: tasksReducer,
    auth: authReducer,

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: [
          'payload.headers',
          'payload.config',
          'payload.request',
        ],
      },
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
