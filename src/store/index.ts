import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import planeReducer from './slices/simplePlaneSlice';
import themeReducer from './slices/themeSlice';

// 导入其他slice（将来会添加）
// import entityReducer from './slices/entitySlice';
// import relationshipReducer from './slices/relationshipSlice';
// import sequenceReducer from './slices/sequenceSlice';
// import aiAgentReducer from './slices/aiAgentSlice';

export const store = configureStore({
  reducer: {
    plane: planeReducer,
    theme: themeReducer,
    // entity: entityReducer,
    // relationship: relationshipReducer,
    // sequence: sequenceReducer,
    // aiAgent: aiAgentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 类型化的hooks
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
): TSelected => useSelector(selector);
