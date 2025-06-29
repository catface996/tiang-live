import { createSlice } from '@reduxjs/toolkit';

// 简化的状态接口
interface SimplePlaneState {
  definitions: any[];
  topology: any;
  metrics: any[];
  selectedPlane: any;
  loading: {
    definitions: boolean;
    topology: boolean;
    metrics: boolean;
  };
  error: {
    definitions: string | null;
    topology: string | null;
    metrics: string | null;
  };
}

// 初始状态
const initialState: SimplePlaneState = {
  definitions: [],
  topology: null,
  metrics: [],
  selectedPlane: null,
  loading: {
    definitions: false,
    topology: false,
    metrics: false
  },
  error: {
    definitions: null,
    topology: null,
    metrics: null
  }
};

// 简化的 Slice
const simplePlaneSlice = createSlice({
  name: 'plane',
  initialState,
  reducers: {
    setDefinitions: (state, action) => {
      state.definitions = action.payload;
      state.loading.definitions = false;
      state.error.definitions = null;
    },
    setTopology: (state, action) => {
      state.topology = action.payload;
      state.loading.topology = false;
      state.error.topology = null;
    },
    setMetrics: (state, action) => {
      state.metrics = action.payload;
      state.loading.metrics = false;
      state.error.metrics = null;
    },
    setSelectedPlane: (state, action) => {
      state.selectedPlane = action.payload;
    },
    setLoading: (state, action) => {
      const { type, loading } = action.payload;
      state.loading[type] = loading;
    },
    setError: (state, action) => {
      const { type, error } = action.payload;
      state.error[type] = error;
      state.loading[type] = false;
    },
    clearErrors: (state) => {
      state.error = {
        definitions: null,
        topology: null,
        metrics: null
      };
    }
  }
});

export const { 
  setDefinitions, 
  setTopology, 
  setMetrics, 
  setSelectedPlane, 
  setLoading, 
  setError, 
  clearErrors 
} = simplePlaneSlice.actions;

export default simplePlaneSlice.reducer;
