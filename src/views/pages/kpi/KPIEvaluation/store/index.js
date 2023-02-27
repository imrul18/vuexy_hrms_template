// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// window list
export const getAllData = createAsyncThunk('kpiEvaluation/getAllData', async (param) => {
  const response = await axios.get('/kpi-evaluation', {params: param})
  return response.data
})

export const windowAction = createAsyncThunk('kpiEvaluation/windowAction', async (data) => {
  const response = await axios.post(`/take-action`, data)
  // dispatch(getGoalPreview(data?.window_id))
  return response.data
})

// goal list
export const getGoal = createAsyncThunk('kpiEvaluation/getGoal', async (window_id) => {
  const response = await axios.get(`/get-goal/${window_id}`)
  return response.data
})

export const getGoalPreview = createAsyncThunk('kpiEvaluation/getGoalPreview', async (window_id) => {
  const response = await axios.get(`/get-goal-preview/${window_id}`)
  return response.data
})

export const saveGoal = createAsyncThunk('kpiEvaluation/saveGoal', async (data) => {
  const response = await axios.post('/save-goal', data)
  return response.data
})

export const kpiEvaluationsSlice = createSlice({
  name: 'kpiEvaluation',
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

export default kpiEvaluationsSlice.reducer
