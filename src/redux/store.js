import { configureStore } from '@reduxjs/toolkit'
import chartsSlice from "../entities/charts.slice";

const store = configureStore({
  reducer: {
    charts: chartsSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})

export default store;