import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

interface GetGroupsResponse {
  result: 1 | 0;
  data?: Group[];
}

export interface Group {
  id: number;
  name: string;
  closed: boolean;
  avatar_color?: string;
  members_count: number;
  friends?: User[];
}

interface User {
  first_name: string;
  last_name: string;
}

interface State {
  data: Group[];
  error: null | string;
}

const initialState: State = { data: [], error: null };

const groupListSlice = createSlice({
  name: 'groupListSlice',
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(getGroupList.fulfilled, (state, { payload }) => {
        if (payload) {
          state.data = payload;
        }
      })
      .addCase(getGroupList.rejected, (state, { payload }) => {
        state.error = (payload as Error).message;
      });
  },
});

export const {} = groupListSlice.actions;
export default groupListSlice.reducer;
