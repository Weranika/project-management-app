import { configureStore } from '@reduxjs/toolkit';
import columnsReducer from './reducers/columnsSlice';
import modalPopupReducer from './reducers/modalPopupSlice';
import langReducer from './reducers/langSlice';
import boardsReducer from './reducers/boardsSlice';
import tasksReducer from './reducers/tasksSlice';

const store = configureStore({
  reducer: {
    columns: columnsReducer,
    modalPopup: modalPopupReducer,
    lang: langReducer,
    boards: boardsReducer,
    tasks: tasksReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        //ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'payload.headers',
          'payload.config',
          'payload.request',
        ],
        // Ignore these paths in the state
        //ignoredPaths: ['form.formValues.avatar'],
      },
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
