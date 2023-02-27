// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// window list
export const getAllData = createAsyncThunk('kpiWindow/getAllData', async (param) => {
  const response = await axios.get('/kpi-window', {params: param})
  return response.data
})

export const getGoalPreview = createAsyncThunk('kpiWindow/getGoalPreview', async (window_id) => {
  const response = await axios.get(`/get-goal-preview/${window_id}`)
  return response.data
})

export const windowAction = createAsyncThunk('kpiWindow/windowAction', async (data, {dispatch}) => {
  const res = await axios.post(`/take-goal-action`, data?.data)
  if (res?.status === 200 || res?.status === 201) {
    dispatch(getGoalPreview(data?.id))
    return {success: true}
  } else {
    return {success: false, error: res?.response?.data}
  }
})

export const evaluationAction = createAsyncThunk('kpiWindow/evaluationAction', async (data, {dispatch}) => {
  const res = await axios.post(`/take-evaluation-action`, data?.data)
  if (res?.status === 200 || res?.status === 201) {
    dispatch(getGoalPreview(data?.id))
    return {success: true}
  } else {
    return {success: false, error: res?.response?.data}
  }
})

// goal list
export const getGoal = createAsyncThunk('kpiWindow/getGoal', async (window_id) => {
  const response = await axios.get(`/get-goal/${window_id}`)
  return response.data
})

export const saveGoal = createAsyncThunk('kpiWindow/saveGoal', async (data) => {
  const response = await axios.post('/save-goal', data)
  return response.data
})

export const kpiWindowsSlice = createSlice({
  name: 'kpiWindow',
  initialState: {
    permission: {},
    allData: [],
    data: [],
    total: 1,

    params: {},

    periodData :null,
    statusOptions :[],

    //Goal list
    goalList : [],
    windowDetails : null,

    //View all
    goalPreviewData: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {        
        state.data = action.payload?.windows?.data   
        state.permission = action.payload?.permission    
        state.total = action.payload.windows?.total
        
        const period_ids = action.payload?.windows?.data?.map(item => {
          return (item?.period_id)
        })
        const periods = action.payload?.windows?.data.filter((item, index) => !period_ids.includes(item?.period_id, index + 1)
        )?.map(item => { return ({value: item?.period_id, label: item?.period_name}) })
        state.periodOptions = periods
        
        state.statusOptions = action.payload?.status
      }) 
      .addCase(getGoal.fulfilled, (state, action) => { 
        state.goalList = action.payload.goals
        state.windowDetails = action.payload?.window
      }) 
      .addCase(getGoalPreview.fulfilled, (state, action) => { 
        state.goalPreviewData = action.payload?.data
      })     
  }
})

export default kpiWindowsSlice.reducer
