import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { State, Filter } from '../types/store';
import { GetGroupsResponse } from '../types/api';

export const getGroupList = createAsyncThunk('groupList/getGroupList', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://65e0de8ad3db23f7624a35cb.mockapi.io/api/v1/groupList');

    if (/^4/.test(response.status.toString())) {
      return rejectWithValue({ message: 'Ошибка на клиенте' });
    }

    if (/^5/.test(response.status.toString())) {
      return rejectWithValue({ message: 'Ошибка на сервере' });
    }

    const data = await response.json();
    const currentData: GetGroupsResponse = data[0];

    if (currentData.data) {
      return currentData.data;
    }
    if (currentData.result === 0 || !currentData.data) {
      return rejectWithValue({ message: 'Нет данных' });
    }
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message });
    } else {
      return rejectWithValue({ message: 'Неизвестная ошибка' });
    }
  }
});

const initialState: State = {
  data: [],
  filters: { closed: 'all', avatar_color: 'all', friends: 'all' },
  selectedGroupId: null,
  status: 'pending',
  error: null,
};

const groupListSlice = createSlice({
  name: 'groupListSlice',
  initialState,
  reducers: {
    setSelectedGroupId: (state, { payload }) => {
      state.selectedGroupId = payload;
    },
    setFilter: (state, { payload }: PayloadAction<Filter>) => {
      state.filters = { ...state.filters, ...payload };
    },
  },

  extraReducers: (buider) => {
    buider
      .addCase(getGroupList.fulfilled, (state, { payload }) => {
        if (payload) {
          state.data = payload;
          state.status = 'fulfilled';
        }
      })
      .addCase(getGroupList.rejected, (state, { payload }) => {
        state.error = (payload as Error).message;
        state.status = 'rejected';
      });
  },
});

export const { setSelectedGroupId, setFilter } = groupListSlice.actions;
export default groupListSlice.reducer;
