import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ThemeType } from '../../styles/theme';

interface ThemeState {
  currentTheme: ThemeType;
}

// 初始状态
const initialState: ThemeState = {
  currentTheme: 'light', // 默认使用浅色主题
};

// 创建主题切换的slice
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // 切换主题
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
    },
    // 设置特定主题
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.currentTheme = action.payload;
    },
  },
});

// 导出actions
export const { toggleTheme, setTheme } = themeSlice.actions;

// 导出reducer
export default themeSlice.reducer;
