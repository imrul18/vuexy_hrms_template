// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// window list
export const getAllData = createAsyncThunk('kpiProfile/getAllData', async (param) => {
  const response = await axios.get('/profile', {params: param})
  return response.data
})

// goal list
export const getGoal = createAsyncThunk('kpiProfile/getGoal', async (window_id) => {
  const response = await axios.get(`/get-goal/${window_id}`)
  return response.data
})

export const getGoalPreview = createAsyncThunk('kpiProfile/getGoalPreview', async (window_id) => {
  const response = await axios.get(`/get-goal-preview/${window_id}`)
  return response.data
})

export const windowAction = createAsyncThunk('kpiProfile/windowAction', async (data) => {
  const response = await axios.post(`/take-action`, data)
  // dispatch(getGoalPreview(data?.window_id))
  return response.data
})


export const saveGoal = createAsyncThunk('kpiProfile/saveGoal', async (data) => {
  const res = await axios.post('/save-goal', data)
  if (res?.status === 200 || res?.status === 201) {
    return {success: true}
  } else {
    return {success: false, error: res?.response?.data}
  }
})

export const updateGoal = createAsyncThunk('kpiProfile/updateGoal', async (data) => {
  const res = await axios.post('/update-goal', data)
  if (res?.status === 200 || res?.status === 201) {
    return {success: true}
  } else {
    return {success: false, error: res?.response?.data}
  }
})

export const getWindow = createAsyncThunk('kpiProfile/getWindow', async (id) => {
  const res = await axios.get(`/windows/${id}`)
  return res?.data
})

export const periodsSlice = createSlice({
  name: 'kpiProfile',
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
    goalListCopy : [],
    windowDetails : null,

    //View all
    goalPreviewData: null,

    windowData: null
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
        state.goalListCopy = action.payload.goals
        state.windowDetails = action.payload?.window
      }) 
      .addCase(getGoalPreview.fulfilled, (state, action) => {
        state.goalPreviewData = action.payload?.data
      }) 
      .addCase(getWindow.fulfilled, (state, action) => {
        state.windowData = action.payload
      })     
  }
})

export default periodsSlice.reducer
