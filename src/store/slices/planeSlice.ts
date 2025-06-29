import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PlaneDefinition, PlaneInstance, PlaneTopology, PlaneMetrics } from '../../types';
import { planeService } from '../../services/planeService';

// 异步 thunks
export const fetchPlaneDefinitions = createAsyncThunk(
  'plane/fetchDefinitions',
  async (params?: any) => {
    const response = await planeService.getPlaneDefinitions(params);
    return response;
  }
);

export const fetchPlaneTopology = createAsyncThunk(
  'plane/fetchTopology',
  async () => {
    const response = await planeService.getPlaneTopology();
    return response;
  }
);

export const fetchPlaneMetrics = createAsyncThunk(
  'plane/fetchMetrics',
  async () => {
    const response = await planeService.getAllPlanesMetrics();
    return response;
  }
);

export const createPlaneDefinition = createAsyncThunk(
  'plane/createDefinition',
  async (data: Partial<PlaneDefinition>) => {
    const response = await planeService.createPlaneDefinition(data);
    return response;
  }
);

export const updatePlaneDefinition = createAsyncThunk(
  'plane/updateDefinition',
  async ({ id, data }: { id: string; data: Partial<PlaneDefinition> }) => {
    const response = await planeService.updatePlaneDefinition(id, data);
    return response;
  }
);

export const deletePlaneDefinition = createAsyncThunk(
  'plane/deleteDefinition',
  async (id: string) => {
    await planeService.deletePlaneDefinition(id);
    return id;
  }
);

// 状态接口
interface PlaneState {
  definitions: PlaneDefinition[];
  instances: PlaneInstance[];
  topology: PlaneTopology | null;
  metrics: PlaneMetrics[];
  selectedPlane: PlaneDefinition | null;
  loading: {
    definitions: boolean;
    instances: boolean;
    topology: boolean;
    metrics: boolean;
  };
  error: {
    definitions: string | null;
    instances: string | null;
    topology: string | null;
    metrics: string | null;
  };
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
}

// 初始状态
const initialState: PlaneState = {
  definitions: [],
  instances: [],
  topology: null,
  metrics: [],
  selectedPlane: null,
  loading: {
    definitions: false,
    instances: false,
    topology: false,
    metrics: false
  },
  error: {
    definitions: null,
    instances: null,
    topology: null,
    metrics: null
  },
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0
  }
};

// Slice
const planeSlice = createSlice({
  name: 'plane',
  initialState,
  reducers: {
    setSelectedPlane: (state, action) => {
      state.selectedPlane = action.payload;
    },
    clearErrors: (state) => {
      state.error = {
        definitions: null,
        instances: null,
        topology: null,
        metrics: null
      };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    // 获取平面定义
    builder
      .addCase(fetchPlaneDefinitions.pending, (state) => {
        state.loading.definitions = true;
        state.error.definitions = null;
      })
      .addCase(fetchPlaneDefinitions.fulfilled, (state, action) => {
        state.loading.definitions = false;
        state.definitions = action.payload.data;
        state.pagination.total = action.payload.total;
      })
      .addCase(fetchPlaneDefinitions.rejected, (state, action) => {
        state.loading.definitions = false;
        state.error.definitions = action.error.message || '获取平面定义失败';
      });

    // 获取平面拓扑
    builder
      .addCase(fetchPlaneTopology.pending, (state) => {
        state.loading.topology = true;
        state.error.topology = null;
      })
      .addCase(fetchPlaneTopology.fulfilled, (state, action) => {
        state.loading.topology = false;
        state.topology = action.payload;
      })
      .addCase(fetchPlaneTopology.rejected, (state, action) => {
        state.loading.topology = false;
        state.error.topology = action.error.message || '获取平面拓扑失败';
      });

    // 获取平面指标
    builder
      .addCase(fetchPlaneMetrics.pending, (state) => {
        state.loading.metrics = true;
        state.error.metrics = null;
      })
      .addCase(fetchPlaneMetrics.fulfilled, (state, action) => {
        state.loading.metrics = false;
        state.metrics = action.payload;
      })
      .addCase(fetchPlaneMetrics.rejected, (state, action) => {
        state.loading.metrics = false;
        state.error.metrics = action.error.message || '获取平面指标失败';
      });

    // 创建平面定义
    builder
      .addCase(createPlaneDefinition.fulfilled, (state, action) => {
        state.definitions.push(action.payload);
      });

    // 更新平面定义
    builder
      .addCase(updatePlaneDefinition.fulfilled, (state, action) => {
        const index = state.definitions.findIndex(def => def.id === action.payload.id);
        if (index !== -1) {
          state.definitions[index] = action.payload;
        }
      });

    // 删除平面定义
    builder
      .addCase(deletePlaneDefinition.fulfilled, (state, action) => {
        state.definitions = state.definitions.filter(def => def.id !== action.payload);
      });
  }
});

export const { setSelectedPlane, clearErrors, setPagination } = planeSlice.actions;
export default planeSlice.reducer;
