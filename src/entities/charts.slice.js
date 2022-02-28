import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from "axios";
import RequestStatus from "../shared/enum/request-status.enum";
import InitialReducerState from "../shared/initial-reducer-state";

const moduleName = `charts`;
const chartsAdapter = createEntityAdapter({});
const initialState = chartsAdapter.getInitialState(InitialReducerState);

export const getChartList = createAsyncThunk(`${moduleName}/getChartList`, async (config, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`https://5i8qcjp333.execute-api.us-east-1.amazonaws.com/dev/series/${config.sets.value}?token=${config.token.value}`, {
      headers: {
        Accept: 'application/json',
        Authorization: config.token.value
      }
    });
    return data.bmx.series.map(_serie => ({..._serie, id:_serie.idSerie}));
  } catch (err) {
    const { response } = err;
    if (response.data.message) throw response.data.message;
    return rejectWithValue(response);
  }
});

const onPending = (state) => {
  state.status = RequestStatus.Loading;
};

const onRejected = (state, action) => {
  state.status = RequestStatus.Failed;
  state.error = action.error.message;
};

const chartsSlice = createSlice({
  name: moduleName,
  initialState,
  extraReducers: {
    [getChartList.pending]: onPending,
    [getChartList.rejected]: onRejected,
    [getChartList.fulfilled]: (state, action) => {
      state.error = null;
      state.status = RequestStatus.Succeeded;
      chartsAdapter.upsertMany(state, action.payload);
    },
  }
})

export const {
  selectAll: selectCharts,
  selectTotal: selectChartsTotal,
  selectById: selectChartsById,
  selectIds: selectChartsIds
} = chartsAdapter.getSelectors(state => state.charts);

export const selectChartStatus = state => state.charts.status

export const selectChartError = state => state.charts.error;

export default chartsSlice.reducer;