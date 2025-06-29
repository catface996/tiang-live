import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { themeStorage, type ThemeType } from '../../utils/storage';

interface ThemeState {
  currentTheme: ThemeType;
}

// 初始状态 - 从localStorage读取用户之前的选择
const initialState: ThemeState = {
  currentTheme: themeStorage.get()
};

// 创建主题切换的slice
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // 切换主题
    toggleTheme: (state) => {
      const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      state.currentTheme = newTheme;
      // 保存到localStorage
      themeStorage.set(newTheme);
    },
    // 设置特定主题
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.currentTheme = action.payload;
      // 保存到localStorage
      themeStorage.set(action.payload);
    }
  }
});

// 导出actions
export const { toggleTheme, setTheme } = themeSlice.actions;

// 导出reducer
export default themeSlice.reducer;

// 导出类型
export type { ThemeType };
